import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

const DEFAULT_MESSAGES = {
  success: 'Success! You have been registered.',
  error: 'Oops, something went wrong. Please try again.',
};

export default function LoginStatusPopup({ status = 'error', message }) {
  const isSuccess = status === 'success';
  const resolvedMessage = message || DEFAULT_MESSAGES[status] || DEFAULT_MESSAGES.error;

  return (
    <div className="login-status-popup">
      <img
        className="login-status-popup__icon"
        src={isSuccess ? successIcon : errorIcon}
        alt={isSuccess ? 'Success' : 'Error'}
      />
      <h2 className="login-status-popup__message">
        {resolvedMessage}
      </h2>
    </div>
  );
}
