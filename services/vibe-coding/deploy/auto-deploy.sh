#!/usr/bin/env bash
#
# vibe-coding 자동 배포 (cron 폴링 방식)
#   - origin/<BRANCH> 에 새 커밋이 있을 때만 deploy.sh 실행.
#   - cron 등록 예 (walter crontab, 5분마다, 중복 실행 방지 flock):
#       */5 * * * * /usr/bin/flock -n /tmp/vibe-auto-deploy.lock \
#         /home/walter/work/LMS-Client/services/vibe-coding/deploy/auto-deploy.sh
#   - 로그: 같은 폴더 auto-deploy.log
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
BRANCH="${DEPLOY_BRANCH:-feature/ai-lab}"
LOG="$SCRIPT_DIR/auto-deploy.log"

# cron 은 최소 PATH 라 node/yarn(nvm) 가 안 잡힌다 → nvm 로드 + 명시 경로 보강.
export NVM_DIR="$HOME/.nvm"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" >/dev/null 2>&1 || true
command -v node >/dev/null 2>&1 || export PATH="$HOME/.nvm/versions/node/v22.22.3/bin:$PATH"

# 로그로 출력 리다이렉트 (10MB 넘으면 회전)
[ -f "$LOG" ] && [ "$(stat -c%s "$LOG" 2>/dev/null || echo 0)" -gt 10485760 ] && mv "$LOG" "$LOG.1"
exec >>"$LOG" 2>&1

echo "===== $(date '+%F %T') auto-deploy check (branch=$BRANCH) ====="
cd "$REPO_ROOT"

git fetch --quiet origin "$BRANCH"
LOCAL="$(git rev-parse HEAD)"
REMOTE="$(git rev-parse "origin/$BRANCH")"

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "변경 없음 (${LOCAL:0:9}) — skip"
  exit 0
fi

echo "새 커밋 감지: ${LOCAL:0:9} → ${REMOTE:0:9} — 배포 시작"
"$SCRIPT_DIR/deploy.sh"
echo "배포 완료: $(git rev-parse --short HEAD)"
