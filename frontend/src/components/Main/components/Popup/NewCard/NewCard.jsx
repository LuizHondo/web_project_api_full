import { useContext, useState } from "react";
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';

export default function NewCard() {
  const { handleAddPlaceSubmit} = useContext(CurrentUserContext)
  const [title, setTitle] = useState();
  const [link, setLink] = useState();



  function handleNewCardSubmit(event) {
    event.preventDefault()
    handleAddPlaceSubmit({name:title,link:link})
  }

  function handleNewCardTitle(event){
    setTitle(event.target.value)
  }
  function handleNewCardLink(event){
    setLink(event.target.value)
  }
  return (
    <form
      className="popup__form"
      name="popup-new-card-form"
      id="popup-new-card-form"
      onSubmit={handleNewCardSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="popup-new-card-name"
          maxLength="30"
          minLength="1"
          name="popup-new-card-name"
          placeholder="Título"
          required
          type="text"
          onChange={handleNewCardTitle}
        />
        <span className="popup__error" id="popup-new-card-name-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="popup-new-card-link"
          name="popup-new-card-link"
          placeholder="Link da imagem"
          required
          type="url"
          onChange={handleNewCardLink}
        />
        <span className="popup__error" id="popup-new-card-link-error"></span>
      </label>

      <button className="button popup__button" type="submit">
        Salvar
      </button>
    </form>
  );
}




