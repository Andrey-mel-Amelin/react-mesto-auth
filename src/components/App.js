import '../index.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { api } from '../utils/Api';
import * as auth from '../utils/auth';
import Header from './Header';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Register from './Register';
import Login from './Login';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { EditProfilePopup } from './EditProfilePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { AddPlacePopup } from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithState from './PopupWithState';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isStatePopupOpen, setIsStatePopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [menuActivity, setMenuActivity] = useState(false);
  const [resStatus, setResStatus] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedForm, setLoggedForm] = useState('');
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!loggedIn) return;
    api
      .getCards()
      .then((cards) => {
        setCards(cards.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .getUserInfo()
      .then((info) => {
        setCurrentUser(info);
      })
      .catch((err) => {
        console.log(err);
      });
    setMenuActivity(false);
  }, [loggedIn]);

  useEffect(() => {
    getContent();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setIsStatePopupOpen(false);
  }

  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editProfileAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddCard(card) {
    api
      .addCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(password, email) {
    return auth
      .login(password, email)
      .then(() => {
        setAuthMessage('Вы успешно вошли!');
        setIsStatePopupOpen(true);
        setResStatus(true);
        setUserEmail(email);
        setLoggedIn(true);
        history.push('/');
        if (history.location.pathname === '/') {
          setMenuActivity(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsStatePopupOpen(true);
        setResStatus(false);
        setAuthMessage(err);
      });
  }

  function handleRegister(password, email) {
    return auth
      .register(password, email)
      .then((res) => {
        if (res) {
          history.push('/signin');
          setIsStatePopupOpen(true);
          setResStatus(true);
          setAuthMessage('Регистрация успешно выполнена!');
        }
      })
      .catch((err) => {
        setIsStatePopupOpen(true);
        setResStatus(false);
        setAuthMessage(err);
      });
  }

  function handleLogout() {
    return auth
      .logout()
      .then(() => {
        setUserEmail('');
        setLoggedIn(false);
        history.push('/signin');
        setMenuActivity(false);
      })
      .catch((err) => console.log(err));
  }

  function getContent() {
    return auth
      .checkToken()
      .then((res) => {
        if (res) {
          setUserEmail(res.email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  }

  function handleAuthorization() {
    if (loggedForm) {
      history.push('/signup');
    } else {
      history.push('/signin');
    }
  }

  function handleMenuToggle() {
    setMenuActivity((active) => !active);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          userEmail={userEmail}
          loggedIn={loggedIn}
          onLogout={handleLogout}
          onAuthorization={handleAuthorization}
          onMenuToggle={handleMenuToggle}
          menuActivity={menuActivity}
          history={history}
        />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={() => setIsEditProfilePopupOpen(true)}
              onAddPlace={() => setIsAddPlacePopupOpen(true)}
              onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
              onCard={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          </ProtectedRoute>
          <Route exact path="/signup">
            <Register onRegister={handleRegister} setLoggedForm={setLoggedForm} />
          </Route>
          <Route exact path="/signin">
            <Login onLogin={handleLogin} loggedIn={loggedIn} setLoggedForm={setLoggedForm} />
          </Route>
          <Route path="*">{loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}</Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddCard={handleAddCard} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <PopupWithForm popupName="remove-card" title="Вы уверены?" buttonText="Да"></PopupWithForm>
        <ImagePopup
          popupName="scale-image"
          selectedCard={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
        <PopupWithState
          authMessage={authMessage}
          onClose={closeAllPopups}
          isOpen={isStatePopupOpen}
          resStatus={resStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
