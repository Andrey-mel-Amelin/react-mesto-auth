function PopupWithState({ resStatus, isOpen, onClose, authMessage }) {
  return (
    <div className={`popup popup_for_state ${isOpen && 'popup_visible'}`} onClick={onClose}>
      <div
        className="popup__container popup__container_for_state"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button className="popup__close-btn" onClick={onClose} aria-label="Закрытие формы" type="button"></button>
        <div className={`popup__res-status ${resStatus && 'popup__res-status_type_res-ok'}`}></div>
        <p className="popup__message">{authMessage}</p>
      </div>
    </div>
  );
}

export default PopupWithState;
