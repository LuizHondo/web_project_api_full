import { useRef, useContext } from 'react';
import CurrentUserContext from '../../../../../contexts/CurrentUserContext';

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(event) {
    event.preventDefault();
    const avatarUrl = avatarRef.current.value;
    handleUpdateAvatar({
      avatar: avatarUrl,
    });
  }

  return (
    <form
      className="popup__form"
      name="popup-avatar-form"
      id="popup-avatar-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="popup-avatar-link"
          name="popup-avatar-link"
          placeholder="Profile image URL"
          ref={avatarRef}
          type="url"
          required
        />
        <span className="popup__error" id="popup-avatar-link-error"></span>
      </label>

      <button className="button popup__button" type="submit" aria-label="Save">
        Save
      </button>
    </form>
  );
}
