import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ name, link, likesAmount, onCardClick, onCardLike, onCardDelete, card }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  return (
    <article className="element">
      <img className="element__image" onClick={() => onCardClick(card)} src={link} alt={name} />
      <button
        onClick={() => onCardDelete(card)}
        className={`element__delete ${isOwn && 'element__delete_active'}`}
        aria-label="Удалить картинку"
        type="button"
      ></button>
      <h2 className="element__title">{name}</h2>
      <button
        onClick={() => onCardLike(card)}
        className={`element__like ${isLiked && 'element__like_active'}`}
        aria-label="Мне нравится"
        type="button"
      ></button>
      <span className="element__like-amount">{likesAmount > 0 ? likesAmount : ''}</span>
    </article>
  );
}

export default Card;
