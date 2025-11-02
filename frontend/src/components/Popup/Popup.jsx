export default function Popup({ onClose, title, children }) {
  return (
    <div className="popup">
      <div className="popup__container">
        <button
          aria-label="Close modal"
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        {title ? <h3 className="popup__title">{title}</h3> : null}
        {children}
      </div>
    </div>
  );
}
