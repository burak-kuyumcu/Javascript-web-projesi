import { useEffect } from "react";

function Toast({
  message,
  type = "success",
  onClose,
}) {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      onClose();
    }, 2800);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [onClose]);

  return (
    <div
      className={`toast toast-${type}`}
      role="status"
      aria-live="polite"
    >
      <div className="toast-icon">
        {type === "success" ? "✓" : "i"}
      </div>

      <span>{message}</span>

      <button
        className="toast-close-button"
        type="button"
        onClick={onClose}
        aria-label="Bildirimi kapat"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;