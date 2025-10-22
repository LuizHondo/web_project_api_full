export default function ImagePopup(props){
    return(
    <>
        <img
            src={props.card.link}
            alt={props.name}
            className="image-popup__content"
        />
        <p className="image-popup__title">{props.name}</p>
    </>

    )
}