export default function Card(props) {
  const { name, link, isLiked } = props.card;
  const { ImagePopup } = props;
  const card = props.card;
  const handlePopup = props.handler;
  const imageComponent = {title:name,children:<ImagePopup card={props.card}/>}
  const cardLikeButtonClassName = `card__like-button ${isLiked ? 'card__heart_active' : ''}`;

  function handleLikeClick(){
    props.onCardLike(card)
  }
  function handleDeleteClick(){
    props.onCardDelete(card)
  }

  return (  
    <li className="card">
      <img className="card__image"
        src={link}
        alt="Imagem do Cartão"
        onClick={()=>{handlePopup(imageComponent)}}
      />
      <button
        aria-label="Delete card"
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      />
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