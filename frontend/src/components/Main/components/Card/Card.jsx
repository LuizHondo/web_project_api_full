export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { ImagePopup } = props;
  const card = props.card;
  const handlePopup = props.handler;
  const imageComponent = {title:name,children:<ImagePopup card={props.card}/>}
  const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__heart_active' : ''}`;
  
  // Extract current user ID - handle both _id and id properties
  const currentUserId = props.currentUser?._id || props.currentUser?.id;
  
  // Extract card owner ID - handle both object with _id and string ID
  // Card.owner can be: string ID, object with _id, or object with id
  let cardOwnerId;
  if (card.owner) {
    if (typeof card.owner === 'object' && card.owner !== null) {
      cardOwnerId = card.owner._id || card.owner.id || card.owner.toString();
    } else {
      cardOwnerId = String(card.owner);
    }
  }
  
  // Compare IDs as strings, ensuring both exist and match
  // isOwner = true means: current user IS the card owner (SHOW button, ALLOW delete)
  // isOwner = false means: current user is NOT the card owner (HIDE button, BLOCK delete)
  const isOwner = currentUserId && cardOwnerId && 
                  String(currentUserId) === String(cardOwnerId);
  
  // Debug logging for troubleshooting ownership issues
  console.log('Card ownership check:', {
    cardId: card._id,
    cardName: card.name,
    currentUserId,
    cardOwnerId,
    isOwner,
    currentUser: props.currentUser,
    cardOwner: card.owner
  });

  function handleLikeClick(){
    props.onCardLike(card)
  }
  
  function handleDeleteClick(){
    // Double-check ownership before allowing delete action
    if (!isOwner) {
      console.warn('Delete attempt blocked: User is not the card owner');
      return;
    }
    props.onCardDelete(card);
  }

  return (  
    <li className="card">
      <img className="card__image"
        src={link}
        alt="Imagem do Cartão"
        onClick={()=>{handlePopup(imageComponent)}}
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