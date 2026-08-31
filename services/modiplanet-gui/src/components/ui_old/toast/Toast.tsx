import toast, { Toaster, ToastBar } from 'react-hot-toast';

interface ToastProps {
  message: string;
  dismissible?: boolean;
}

/**
 * Toast 표시 함수
 * @param message 표시할 메시지
 * @param dismissible X 버튼 표시 여부 (기본: false)
 */
export const showToast = (message: string, dismissible: boolean = false) => {
  toast(message, {
    duration: dismissible ? Infinity : 3000,
    id: message,
  });
};

export const ToastContainer = () => {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3000,
        style: {
          minHeight: '46px',
          height: 'auto',
          background: '#000',
          color: '#fff',
          padding: '0 16px',
          fontSize: '14px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          maxWidth: 'fit-content',
          borderRadius: '2px',
        },
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            animation: t.visible
              ? 'toast-enter 0.2s ease-out'
              : 'toast-exit 0.2s ease-in forwards',
          }}
        >
          {({ icon, message }) => (
            <div
              style={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              <span>{message}</span>
              {t.duration === Infinity && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  style={{
                    marginLeft: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    padding: 0,
                  }}
                  aria-label="닫기"
                >
                  <img
                    src="/assets/modal-close.svg"
                    alt="닫기"
                    style={{
                      width: '14px',
                      height: '14px',
                      filter: 'brightness(3)',
                    }}
                  />
                </button>
              )}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default ToastContainer;
