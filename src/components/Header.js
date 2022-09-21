function Header({ loggedIn, history, onLogout }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <button
        className="header__button"
        type="button"
        onClick={
          loggedIn
            ? onLogout
            : history.location.pathname === '/sign-in'
            ? history.push('/sign-up')
            : history.push('/sign-in')
        }
      >
        {loggedIn ? 'Выйти' : history.location.pathname === '/sign-in' ? 'Регистрация' : 'Войти'}
      </button>
    </header>
  );
}

export default Header;
