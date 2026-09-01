# vibe-coding 사내망 배포 가이드 (런북)

AI코딩(vibe-coding) 프론트를 사내망에 서비스하고 내부 edu-agent와 연동하는 전체 절차.
빠른 명령 참조는 [`README.md`](./README.md), 이 문서는 처음부터 끝까지의 운영 가이드입니다.

---

## 1. 아키텍처

```
                          사내망 (LAN)
  ┌─────────┐   https://ai.modiplanet.com    ┌──────────────────────────┐
  │ 브라우저 │ ──────────────────────────────▶│ 192.168.0.102            │
  └─────────┘                                 │ Nginx Proxy Manager(Docker)│
                                              │  · SSL 종료               │
                                              │  · location /      → 8095 │
                                              │  · location /agent/ → 18080│ (Custom Nginx Config)
                                              └───────┬──────────┬────────┘
                                                      │          │
                                  정적(/)  ▼          │          ▼  /agent/* (프리픽스 제거)
                            ┌──────────────────────┐  │   ┌────────────────────────┐
                            │ 192.168.0.95:8095     │  │   │ 192.168.0.95:18080      │
                            │ nginx:alpine 컨테이너 │  │   │ edu-agent (FastAPI)     │
                            │ vibe-coding 정적 SPA  │  │   │ 컨테이너 8000 매핑       │
                            └──────────────────────┘  │   └────────────────────────┘
                                                       │
   walter 서버 (192.168.0.95) = 빌드 + 정적 서빙 + edu-agent 모두 동일 머신
```

- **프록시·SSL**: 192.168.0.102 (NPM)
- **빌드 + 정적 서빙 + 백엔드**: 192.168.0.95 (walter 서버, 이 레포가 있는 머신)
- 프론트는 `REACT_APP_AGENT_API=/agent` 로 빌드 → 브라우저가 `same-origin` 으로 `/agent/*` 호출
  → NPM(또는 컨테이너 nginx)이 `/agent/` 프리픽스를 떼고 edu-agent 로 전달 (mixed-content·CORS 없음)

## 2. 구성요소

| 구성 | 호스트:포트 | 역할 |
|---|---|---|
| Nginx Proxy Manager | 192.168.0.102 | 도메인(`ai.modiplanet.com`)·SSL·프록시 |
| vibe 정적 컨테이너 | 192.168.0.95:8095 | SPA 정적 서빙 (nginx:alpine) |
| edu-agent | 192.168.0.95:18080 | AI 백엔드 (FastAPI, 컨테이너 8000) |
| 빌드 도구 | walter 서버 | Node 22 + corepack(yarn 1.22.22) + Docker |

## 3. 사전 준비 (walter 서버, 최초 1회)

```bash
# yarn 활성화 (Node 22 corepack)
sudo corepack enable

# canvas 네이티브 빌드용 시스템 라이브러리 (transitive 의존성)
sudo apt-get update
sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
```

> walter 는 `docker` 그룹 미소속이라 docker 명령에 `sudo` 필요.
> 편의상 그룹 추가 가능: `sudo usermod -aG docker walter` (후 재로그인).

## 4. 최초 배포 (walter 서버)

```bash
cd /home/walter/work/LMS-Client/services/vibe-coding/deploy

./deploy.sh              # git pull → yarn install → build:prod → html/ 생성
sudo docker compose up -d   # 정적 서빙 컨테이너(:8095) 기동

curl -I http://192.168.0.95:8095        # 200 확인
curl -i http://192.168.0.95:8095/agent/projects   # 200 + JSON (agent 프록시 확인)
```

`deploy.sh` 가 하는 일:
1. `git pull --ff-only` (`SKIP_GIT=1` 로 생략 가능)
2. `corepack` 로 yarn 활성화
3. `yarn install --frozen-lockfile --ignore-engines`
   - `--ignore-engines`: modiplanet-gui 의 `node>=20<21` 핀 회피 (vibe 만 빌드하므로 무해)
4. `yarn workspace @luxrobo/vibe-coding build:prod` (`REACT_APP_AGENT_API=/agent` 주입)
5. `rsync -a --delete build/ → deploy/html/`

## 5. NPM 설정 (192.168.0.102 웹 UI)

### 5-1. Proxy Host (프론트)
**Hosts → Proxy Hosts → Add Proxy Host**
- Domain Names: `ai.modiplanet.com`
- Scheme: `http` / Forward Hostname-IP: `192.168.0.95` / Forward Port: `8095`
- Websockets Support: ON
- **SSL** 탭: 인증서 적용 + Force SSL

### 5-2. agent 프록시 — Advanced → Custom Nginx Configuration
같은 Proxy Host 편집 → **Advanced** 탭의 **Custom Nginx Configuration** 박스에 붙여넣고 Save:

```nginx
location /agent/ {
    proxy_pass http://192.168.0.95:18080/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # /chat 스트리밍(SSE) — 버퍼링 끄고 타임아웃 길게
    proxy_buffering off;
    proxy_cache off;
    proxy_read_timeout 3600s;
    proxy_send_timeout 3600s;
}
```

> **`proxy_pass` 끝의 슬래시(`18080/`)가 핵심** — `/agent/` 프리픽스를 떼고 edu-agent 로 보낸다.
> 예: `…/agent/projects` → edu-agent `/projects`. 슬래시를 빼면 `/agent/projects` 로 가서 404.

검증:
```bash
curl -i https://ai.modiplanet.com/agent/projects   # 200 + JSON
```

## 6. 재배포 (코드 변경 시 매번)

```bash
cd /home/walter/work/LMS-Client/services/vibe-coding/deploy
./deploy.sh        # 빌드 + html/ 교체 (컨테이너 재시작 불필요 — 정적 파일만 갱신)
```

옵션:
- `SKIP_GIT=1 ./deploy.sh` — git pull 없이 현재 체크아웃으로 빌드
- `REACT_APP_AGENT_API=<주소> ./deploy.sh` — agent 주소를 임시로 다르게 주입

> `nginx.conf` / `docker-compose.yml` 을 바꿨을 때만 `sudo docker compose up -d`(재생성) 또는
> `sudo docker compose restart` 가 추가로 필요.

## 7. edu-agent 연동 메모

- 프론트 호출 엔드포인트: `/agent/projects`, `/agent/chat`(SSE 스트리밍), `/agent/chat/stop`,
  `/agent/session/{id}/restore`, `/agent/reference/{name}/instantiate`
- `AGENT_API` 해석: `packages/ai-lab/src/config.ts` — `REACT_APP_AGENT_API ?? (prod ? 외부도메인 : localhost:8000)`
  → 배포 시 `/agent` 로 덮어써 same-origin 사용
- edu-agent CORS 는 `allow_origins=["*"]` 이지만, 프록시 경유는 same-origin 이라 CORS 불필요
- agent 주소/포트가 바뀌면: NPM Custom Nginx Config 의 `proxy_pass` 만 수정 (프론트 재빌드 불필요)

## 8. 검증 체크리스트

| 항목 | 명령 | 기대 |
|---|---|---|
| 정적 루트 | `curl -I http://192.168.0.95:8095` | 200 |
| SPA fallback | `curl -o /dev/null -w '%{http_code}' http://192.168.0.95:8095/x/y` | 200 |
| agent 프록시(컨테이너) | `curl -i http://192.168.0.95:8095/agent/projects` | 200 JSON |
| agent 프록시(NPM/HTTPS) | `curl -i https://ai.modiplanet.com/agent/projects` | 200 JSON |
| edu-agent 직접 | `curl -i http://192.168.0.95:18080/projects` | 200 JSON |
| 번들 주입 확인 | `grep -rl '"/agent"' html/assets/` | 파일 1개 이상 |

## 9. 트러블슈팅

| 증상 | 원인 / 해결 |
|---|---|
| `yarn` 없음 | `sudo corepack enable` |
| `engine "node" incompatible (modiplanet-gui)` | deploy.sh 의 `--ignore-engines` 로 처리 (또는 `nvm use 20`) |
| `canvas` 빌드 실패 (`gif_lib.h` 등) | §3 의 apt 라이브러리 설치 (1회면 캐시됨) |
| `permission denied ... docker.sock` | docker 명령에 `sudo`, 또는 `usermod -aG docker walter` |
| `/agent/...` 가 404 | NPM `proxy_pass` 끝 슬래시 확인(`18080/`). 프리픽스 미제거 시 발생 |
| AI 호출만 안 됨(UI 정상) | edu-agent 컨테이너 상태 `sudo docker ps`(healthy), 18080 리스닝 확인 |
| chat 응답이 한 번에 몰려서 옴 | SSE 버퍼링 — NPM Custom Config 에 `proxy_buffering off` 포함됐는지 확인 |
| HTTPS 에서 AI 호출 차단(mixed-content) | 프론트가 `/agent`(상대경로)로 빌드됐는지 확인. 절대 http 주소면 재빌드 |

## 10. 자동화 로드맵 (선택)

수동 `deploy.sh` 가 안정화되면, walter 서버에 GitHub **self-hosted runner** 를 설치해
`feature/ai-lab` push(또는 태그) 시 자동으로 `deploy.sh` 를 돌리도록 승격할 수 있다.
빌드가 서버 내부에서 실행되므로 SSH 키·시크릿이 필요 없다.
