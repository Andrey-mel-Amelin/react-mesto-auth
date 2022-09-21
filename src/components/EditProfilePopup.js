import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  function handleValueChange(evt) {
    if (evt.target.name === 'name') {
      setName(evt.target.value);
    } else {
      setAbout(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: about,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      popupName="edit-author"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="form__input form__input_info_name-author"
        name="name"
        id="name-author-input"
        placeholder="Имя автора"
        type="text"
        minLength="2"
        maxLength="40"
        defaultValue={name}
        onChange={handleValueChange}
        required
      />
      <span className="form__input-error name-author-input-error"></span>
      <input
        className="form__input form__input_info_name-author-job"
        name="about"
        id="name-author-job-input"
        placeholder="Профессия автора"
        type="text"
        minLength="2"
        maxLength="200"
        defaultValue={about}
        onChange={handleValueChange}
        required
      />
      <span className="form__input-error name-author-job-input-error"></span>
    </PopupWithForm>
  );
}
