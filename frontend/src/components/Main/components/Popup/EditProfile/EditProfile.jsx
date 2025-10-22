import { useState, useContext } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';


export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);

  // Variáveis de estado vinculadas aos valores atuais do usuário
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);


  // Usuário digita "João Santos"
  // handleNameChange é chamado
  const handleNameChange = (event) => {
    setName(event.target.value); // "João Santos"
  };
  
  // Manipulador para o campo descrição
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({name,about: description})
  }


  return (
    <form
      className="popup__form"
      name="popup-edit-profile-form"
      id="popup-edit-profile-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input 
          className="popup__input popup__input_type_name"
          id="popup-edit-profile-name"
          maxLength="40"
          minLength="2"
          name="popup-edit-profile-name"
          placeholder="Nome"
          type="text"
          required
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="popup-edit-profile-name-error"></span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_description"
          id="popup-edit-profile-description"
          name="popup-edit-profile-description"
          maxLength="200"
          minLength="2"
          placeholder="Sobre mim"
          value={description}
          required
          type="text"
          onChange={handleDescriptionChange}
        />
        <span
          className="popup__error"
          id="popup-edit-profile-description-error"
        ></span>
      </label>

      <button 
        className="button popup__button" 
        type="submit" 
        aria-label="Salvar"
        >
        Salvar
      </button>
    </form>
  );
}