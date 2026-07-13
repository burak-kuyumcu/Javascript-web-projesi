function ConfirmModal({
  title,
  message,
  onConfirm,
  onCancel,
}) {
  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={onCancel}
    >
      <div
        className="confirm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="confirm-modal-icon">!</div>
        <h3 id="confirm-modal-title">{title}</h3>

        <p>{message}</p>

        <div className="confirm-modal-actions">
          <button
            className="secondary-button"
            type="button"
            onClick={onCancel}
          >
            Vazgeç
          </button>

          <button
            className="danger-button"
            type="button"
            onClick={onConfirm}
          >
            Görevi Sil
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;