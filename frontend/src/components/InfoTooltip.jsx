import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

export default function InfoTooltip({ isOpen, onClose, status }) {
  if (!isOpen) return null;

  const isSuccess = status === 'success';

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        />
        <img
          className="popup__icon"
          src={isSuccess ? successIcon : errorIcon}
          alt={isSuccess ? 'Success' : 'Error'}
        />
        <h2 className="popup__title">
          {isSuccess
            ? 'Success! You have been registered.'
            : 'Oops, something went wrong. Please try again.'}
        </h2>
      </div>
    </div>
  );
}
