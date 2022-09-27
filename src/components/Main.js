import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCard, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        </div>
        <div className="profile__profile-info">
          <div className="profile__author-container">
            <h1 className="profile__author">{currentUser.name}</h1>
            <button
              className="profile__edit-btn"
              onClick={onEditProfile}
              aria-label="Редактирование профиля"
              type="button"
            />
          </div>
          <p className="profile__author-job">{currentUser.about}</p>
        </div>
        <button className="profile__add-card-btn" onClick={onAddPlace} aria-label="Добавление карточки" type="button" />
      </section>
      <section className="elements" aria-label="Карточки с изображениями">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            name={card.name}
            link={card.link}
            likesAmount={card.likes.length}
            onCardClick={onCard}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
