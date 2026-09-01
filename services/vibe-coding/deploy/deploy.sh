#!/usr/bin/env bash
#
# vibe-coding 사내망 배포 스크립트 (walter 서버 = 192.168.0.95 에서 실행)
#
#   사용법:
#     ./deploy.sh                        # 현재 체크아웃 그대로 빌드·배포
#     SKIP_GIT=1 ./deploy.sh             # git pull 생략 (로컬 변경분 그대로 배포)
#     REACT_APP_AGENT_API=http://192.168.0.95:18080 ./deploy.sh   # 백엔드 주소 주입
#
#   동작: git pull → yarn install → vibe-coding 빌드 → deploy/html 갱신
#         정적 서빙 컨테이너는 ./html 를 마운트하므로 재시작 불필요(즉시 반영).
#         최초 1회만: docker compose up -d (README 참고)
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
TARGET="$SCRIPT_DIR/html"

# 백엔드(edu-agent) 주소 — same-origin 리버스프록시 경유(/agent).
# 브라우저는 https://ai.modiplanet.com/agent/... 로 같은 출처에 요청하고,
# vibe nginx(nginx.conf 의 location /agent/)가 내부 edu-agent(192.168.0.95:18080)로 전달한다.
# → HTTPS(ai.modiplanet.com)에서도 mixed-content 없음, agent 외부 비노출, CORS 불필요.
# edu-agent: /home/walter/work/edu-agent (컨테이너 8000 → 호스트 18080, 0.0.0.0).
export REACT_APP_AGENT_API="${REACT_APP_AGENT_API:-/agent}"

cd "$REPO_ROOT"
echo "▶ repo: $REPO_ROOT"

if [ "${SKIP_GIT:-0}" != "1" ]; then
  echo "▶ git pull --ff-only"
  git pull --ff-only
fi

# yarn(1.22.22) 확보 — Node 22 의 corepack 사용. 최초 1회 'sudo corepack enable' 필요할 수 있음.
if ! command -v yarn >/dev/null 2>&1; then
  echo "▶ corepack enable (yarn 활성화)"
  corepack enable >/dev/null 2>&1 || true
fi
corepack prepare yarn@1.22.22 --activate >/dev/null 2>&1 || true

# --ignore-engines: 모노레포 전체를 해석하느라 modiplanet-gui(node>=20<21) 엔진 핀에 걸린다.
# vibe-coding 만 빌드하므로 무시해도 안전(서버 Node 22).
echo "▶ yarn install"
yarn install --frozen-lockfile --ignore-engines

echo "▶ build (vibe-coding, production)  AGENT_API='${REACT_APP_AGENT_API:-<placeholder>}'"
yarn workspace @luxrobo/vibe-coding build:prod

echo "▶ deploy → $TARGET"
mkdir -p "$TARGET"
rsync -a --delete "$REPO_ROOT/services/vibe-coding/build/" "$TARGET/"

echo "✓ deployed $(git rev-parse --short HEAD 2>/dev/null || echo local) → $TARGET"
echo "  접속 확인: http://192.168.0.95:8095  (NPM 사내도메인 경유 시 해당 도메인)"
