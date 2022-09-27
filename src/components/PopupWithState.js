function PopupWithState({ resStatus, isOpen, onClose }) {
  return (
    <div className={`popup popup_for_state ${isOpen && 'popup_visible'}`} onClick={onClose}>
      <div
        className="popup__container popup__container_for_state"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button className="popup__close-btn" onClick={onClose} aria-label="Закрытие формы" type="button"></button>
        <div className={`popup__res-status popup__res-status_type_${resStatus && 'res-ok'}`}></div>
        <p className="popup__message">
          {resStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
}

export default PopupWithState;
