function PopupWithForm({ popupName, title, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={`popup popup_for_${popupName} ${isOpen && 'popup_visible'}`} onClick={onClose}>
      <div
        className="popup__container"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button className="popup__close-btn" onClick={onClose} aria-label="Закрытие формы" type="button"></button>
        <form className="form form_for_edit-author" onSubmit={onSubmit} name={popupName} noValidate>
          <h2 className="form__title">{title}</h2>
          {children}
          <button className="form__submit" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
