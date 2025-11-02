export default function DeleteConfirmation({ onConfirm, onCancel }) {
  return (
    <div className="popup__confirmation">
      <div className="popup__confirmation-buttons">
        <button
          className="button popup__button popup__button_confirm"
          type="button"
          onClick={onConfirm}
        >
          Yes
        </button>
        <button
          className="button popup__button popup__button_cancel"
          type="button"
          onClick={onCancel}
        >
          No
        </button>
      </div>
    </div>
  );
}

