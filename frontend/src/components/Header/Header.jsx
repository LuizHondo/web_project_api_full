import logo from '../../images/logo.svg';

export default function Header({ email, onSignOut, isLoggedIn }) {
  return (
    <header className={isLoggedIn ? 'header' : 'header__anonymous'}>
      <img
        className="header__logo"
        src={logo}
        alt="Around US logo"
      />
      {isLoggedIn && (
        <div className="header__nav">
          <span className="header__email">{email}</span>
          <button
            className="header__button"
            onClick={onSignOut}
            type="button"
          >
            Sign out
          </button>
        </div>
      )}
    </header>
  );
}
