import PopupWithForm from './PopupWithForm';
import { useRef, useEffect } from 'react';

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(avatarRef.current.value);
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      popupName="edit-avatar"
      title="Обновить ватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Сохранить"
    >
      <input
        className="form__input"
        name="link"
        placeholder="Ссылка на аватар"
        id="link-avatar-input"
        type="url"
        ref={avatarRef}
        required
      />
      <span className="form__input-error link-avatar-input-error"></span>
    </PopupWithForm>
  );
}
