function ImagePopup({ popupName, selectedCard, onClose, isOpen }) {
  return (
    <div className={`popup popup_for_${popupName} ${isOpen && 'popup_visible'}`} onClick={onClose}>
      <div
        className="popup__container"
        onClick={(evt) => {
          evt.stopPropagation();
        }}
      >
        <button className="popup__close-btn" onClick={onClose} aria-label="Закрытие формы" type="button"></button>
        <figure className="popup__image-container">
          <img className="popup__image" src={selectedCard.link} alt={selectedCard.name} />
          <figcaption className="popup__image-title">{selectedCard.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
