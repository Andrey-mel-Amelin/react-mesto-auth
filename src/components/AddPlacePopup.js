import PopupWithForm from './PopupWithForm';
import { useEffect, useState } from 'react';

export function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [nameCard, setNameCard] = useState('');
  const [linkCard, setLinkCard] = useState('');

  useEffect(() => {
    setNameCard('');
    setLinkCard('');
  }, [isOpen]);

  function handleValueChange(evt) {
    if (evt.target.name === 'name') {
      setNameCard(evt.target.value);
    } else {
      setLinkCard(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddCard({
      name: nameCard,
      link: linkCard,
    });
  }

  return (
    <PopupWithForm
      popupName="add-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Создать"
    >
      <input
        name="name"
        className="form__input form__input_info_name-card"
        id="name-card-input"
        placeholder="Название"
        type="text"
        minLength="2"
        maxLength="30"
        value={nameCard || ''}
        onChange={handleValueChange}
        required
      />
      <span className="form__input-error name-card-input-error"></span>
      <input
        name="link"
        className="form__input form__input_info_link-img"
        id="link-img-input"
        placeholder="Ссылка на картинку"
        type="url"
        value={linkCard || ''}
        onChange={handleValueChange}
        required
      />
      <span className="form__input-error link-img-input-error"></span>
    </PopupWithForm>
  );
}
