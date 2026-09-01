// Full-screen fallback for the root Sentry.ErrorBoundary (see main.tsx).
// Renders outside the crashed tree, so no NextUIProvider/router here —
// plain elements and hard navigation only.
export default function ErrorFallback() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-[12px] bg-white px-[24px] text-center">
      <img className="w-[160px] mb-[12px]" src="/assets/logo.svg" alt="MODI Planet" />
      <h1 className="text-24 font-bold text-font-main">문제가 발생했어요</h1>
      <p className="text-15 text-font-sub_1 leading-[1.6]">
        일시적인 오류로 화면을 표시하지 못했어요.
        <br />
        새로고침하거나 처음 화면으로 이동해 주세요.
      </p>
      <div className="flex gap-[8px] mt-[16px]">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="h-[44px] px-[24px] rounded-[8px] bg-brand text-white text-15 font-semibold hover:bg-brand_dark transition-colors"
        >
          새로고침
        </button>
        <button
          type="button"
          onClick={() => window.location.assign('/')}
          className="h-[44px] px-[24px] rounded-[8px] border border-form-border text-font-sub text-15 font-semibold hover:bg-form-bg transition-colors"
        >
          처음으로
        </button>
      </div>
    </div>
  );
}
