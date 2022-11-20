import { Switch, Route, Link} from 'react-router-dom';

function Header({ userEmail, loggedIn, onLogout, onAuthorization, history, onMenuToggle, menuActivity }) {
  return (
    <header className={`header ${!loggedIn ? 'header_for_authorization' : ''}`}>
      <div className="header__logo">
        {history.location.pathname === '/' && (
          <div className="header__menu-container" onClick={onMenuToggle}>
            <span className={`header__menu ${menuActivity ? 'header__menu_active' : ''}`}></span>
          </div>
        )}
        <Switch>
          <Route path="/signup">
            <Link to="/signin" className="header__button">
              Войти
            </Link>
          </Route>
          <Route path="/signin">
            <Link to="/signup" className="header__button">
              Регистрация
            </Link>
          </Route>
        </Switch>
      </div>
      {(menuActivity || window.screen.width >= 767) && (
        <div className="header__email-user">
          {userEmail}
          <button className="header__button" type="button" onClick={loggedIn ? onLogout : onAuthorization}>
            {loggedIn && 'Выйти'}
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
