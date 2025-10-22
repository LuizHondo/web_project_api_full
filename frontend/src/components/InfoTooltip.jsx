import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

export default function InfoTooltip({ isOpen, onClose, status }) {
  if (!isOpen) return null;

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
          src={status === 'success' ? successIcon : errorIcon}
          alt={status === 'success' ? 'Sucesso' : 'Erro'}
        />
        <h2 className="popup__title">
          {status === 'success' 
            ? 'Sucesso! Você foi registrado.' 
            : 'Ops, algo deu errado! Por favor, tente novamente.'
          }
        </h2>
      </div>
    </div>
  );
}
