import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name || '');
    setDescription(currentUser.about || '');
  }, [currentUser]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

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
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
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
          placeholder="About me"
          value={description}
          required
          type="text"
          onChange={(event) => setDescription(event.target.value)}
        />
        <span
          className="popup__error"
          id="popup-edit-profile-description-error"
        ></span>
      </label>

      <button
        className="button popup__button"
        type="submit"
        aria-label="Save changes"
      >
        Save
      </button>
    </form>
  );
}
