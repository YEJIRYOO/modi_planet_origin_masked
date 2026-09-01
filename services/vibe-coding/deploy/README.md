# vibe-coding 사내망 배포

AI코딩(vibe-coding) 정적 SPA 를 사내망에 서비스하기 위한 배포 구성.

## 토폴로지

```
브라우저 ─(사내망)→ 192.168.0.102  Nginx Proxy Manager (Docker)
                          │  사내도메인 + SSL
                          │  proxy_pass http://192.168.0.95:8095
                          ▼
   walter 서버 (192.168.0.95, 이 레포가 있는 머신)
   ├─ deploy.sh           : git pull → yarn build → ./html 갱신
   └─ docker compose      : nginx:alpine 컨테이너(:8095) 가 ./html 정적 서빙
```

- 빌드·서빙 = walter 서버 / 프록시·SSL = 192.168.0.102(NPM)
- 빌드 호스트와 서빙 컨테이너가 같은 머신 → dist 를 네트워크로 옮길 필요 없음

## 최초 1회 셋업 (walter 서버)

```bash
cd /home/walter/work/LMS-Client/services/vibe-coding/deploy

# 1) yarn 활성화 (Node22 corepack). 권한 오류 시 sudo.
sudo corepack enable

# 2) 첫 빌드 → html/ 생성
./deploy.sh

# 3) 정적 서빙 컨테이너 기동 (이후 계속 떠 있음)
#    walter 는 docker 그룹 미소속이라 sudo 필요. (선택: sudo usermod -aG docker walter 후 재로그인하면 sudo 불필요)
sudo docker compose up -d

# 확인
curl -I http://192.168.0.95:8095
```

## 192.168.0.102 (NPM) 설정 — 웹 UI에서 1회

1. **Hosts → Proxy Hosts → Add Proxy Host**
   - Domain Names: `사내도메인` (사내 DNS 에 192.168.0.102 로 등록되어 있어야 함)
   - Scheme: `http`
   - Forward Hostname / IP: `192.168.0.95`
   - Forward Port: `8095`
   - Websockets Support: ON (스트리밍 대비)
2. **SSL 탭**: 사내 인증서 적용(또는 Let's Encrypt 사내 환경 가능 시) + Force SSL

## 재배포 (이후 매번)

```bash
cd /home/walter/work/LMS-Client/services/vibe-coding/deploy
./deploy.sh                 # git pull + 빌드 + html 갱신 (컨테이너 재시작 불필요)
```

옵션:
- `SKIP_GIT=1 ./deploy.sh` — git pull 없이 현재 체크아웃으로 빌드
- `REACT_APP_AGENT_API=http://192.168.0.95:18080 ./deploy.sh` — 백엔드 주소 주입

## 백엔드(edu-agent) 연결 — 적용됨

- edu-agent: FastAPI, 컨테이너 8000 → 호스트 18080(0.0.0.0), CORS `allow_origins=["*"]` (`/home/walter/work/edu-agent`)
- **현재 방식(직접 호출)**: deploy.sh 기본값 `REACT_APP_AGENT_API=http://192.168.0.95:18080`.
  브라우저가 프론트(8095)에서 앱을 받고 edu-agent(18080)로 직접 fetch 한다. CORS 가 열려 있어 동작.
  주소를 바꾸려면 `REACT_APP_AGENT_API=... ./deploy.sh` (빌드 시점에 박히므로 재빌드 필요).
- **주의(향후 HTTPS)**: 프론트를 NPM HTTPS(사내도메인)로 노출하면, HTTP 인 `http://192.168.0.95:18080`
  직접 호출은 브라우저 **mixed-content** 로 차단된다. 그때는 아래 둘 중 하나로 전환:
  1) edu-agent 도 NPM Proxy Host(예: `agent.사내도메인` + SSL)로 올리고
     `REACT_APP_AGENT_API=https://agent.사내도메인` 으로 재빌드, 또는
  2) vibe nginx 에 `/agent/` 리버스프록시 location 추가(SSE 위해 `proxy_buffering off`) 후
     `REACT_APP_AGENT_API=/agent` (same-origin, agent 외부 비노출).

## 자동화 승격 (선택, 나중에)

검증되면 이 `deploy.sh` 를 GitHub **self-hosted runner**(walter 서버에 설치) 워크플로우로 감싸
`git push`(또는 태그) 시 자동 배포 가능. 빌드가 서버 안에서 돌기 때문에 SSH 키/시크릿 불필요.

## 트러블슈팅

- `8095` 충돌: `docker-compose.yml` 의 포트와 NPM Forward Port 를 동일하게 변경
- 새 배포가 안 보임: 브라우저 캐시 — `index.html` 은 no-cache 이나 CDN/프록시 캐시 확인
- 빌드 실패(yarn 없음): `sudo corepack enable` 재실행
- yarn 엔진 에러(modiplanet-gui node>=20<21): deploy.sh 가 `--ignore-engines` 로 처리. 또는 `nvm use 20`
- `canvas` 네이티브 빌드 실패(`gif_lib.h` 등 헤더 없음): 1회 시스템 라이브러리 설치
  `sudo apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev`
- 라우트 새로고침 404: nginx `try_files ... /index.html` (SPA fallback) 적용 확인
