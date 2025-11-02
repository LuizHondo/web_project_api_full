export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { ImagePopup } = props;
  const card = props.card;
  const handlePopup = props.handler;
  const imageComponent = { title: name, children: <ImagePopup card={props.card} /> };
  const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__heart_active' : ''}`;

  const currentUserId = props.currentUser?._id || props.currentUser?.id;

  let cardOwnerId;
  if (card.owner) {
    if (typeof card.owner === 'object' && card.owner !== null) {
      cardOwnerId = card.owner._id || card.owner.id || card.owner.toString();
    } else {
      cardOwnerId = String(card.owner);
    }
  }

  const isOwner = currentUserId && cardOwnerId &&
    String(currentUserId) === String(cardOwnerId);

  console.log('Card ownership check:', {
    cardId: card._id,
    cardName: card.name,
    currentUserId,
    cardOwnerId,
    isOwner,
    currentUser: props.currentUser,
    cardOwner: card.owner,
  });

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    if (!isOwner) {
      console.warn('Delete attempt blocked: User is not the card owner');
      return;
    }
    props.onCardDelete(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt="Card"
        onClick={() => { handlePopup(imageComponent); }}
      />
      {isOwner && (
        <button
          aria-label="Delete card"
          className="card__delete-button"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="card__description">
        <h2 className="card__title">{name}</h2>
        <button
          aria-label="Like card"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
      </div>
    </li>
  );
}
