import { useContext } from 'react';
import Popup from './components/Popup/Popup';
import NewCard from './components/Popup/NewCard/NewCard';
import EditProfile from './components/Popup/EditProfile/EditProfile';
import EditAvatar from './components/Popup/EditAvatar/EditAvatar';
import DeleteConfirmation from './components/Popup/DeleteConfirmation/DeleteConfirmation';
import Card from './components/Card/Card';
import ImagePopup from './components/Popup/ImagePopup/ImagePopup';

import CurrentUserContext from '../../contexts/CurrentUserContext';

export default function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const newCardPopup = { title: 'New place', children: <NewCard /> };
  const editProfilePopup = { title: 'Edit profile', children: <EditProfile /> };
  const editAvatarPopup = { title: 'Update profile picture', children: <EditAvatar /> };

  const { currentUser } = useContext(CurrentUserContext);

  function handleDeleteConfirmation(card) {
    const deleteConfirmationPopup = {
      title: 'Are you sure you want to delete this card?',
      children: (
        <DeleteConfirmation
          onConfirm={() => {
            onCardDelete(card);
            onClosePopup();
          }}
          onCancel={onClosePopup}
        />
      ),
    };
    onOpenPopup(deleteConfirmationPopup);
  }

  return (
    <>
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar-container">
            <div
              className="profile__avatar-button"
              onClick={() => onOpenPopup(editAvatarPopup)}
            />
            <img
              alt="Profile avatar"
              className="profile__avatar"
              src={currentUser.avatar}
            />
          </div>
          <div className="profile__info-text">
            <div className="profile__name">
              <h1 className="profile__name-text">{currentUser.name}</h1>
              <button
                className="profile__name-edit-button"
                aria-label="Edit profile"
                onClick={() => onOpenPopup(editProfilePopup)}
              >
                <div
                  aria-hidden
                  className="profile__name-edit-button-image"
                />
              </button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          onClick={() => { onOpenPopup(newCardPopup); }}
          aria-label="Add new place"
          type="button"
        />
      </section>

      <section className="cards">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              handler={onOpenPopup}
              key={card._id}
              card={card}
              ImagePopup={ImagePopup}
              onCardLike={onCardLike}
              onCardDelete={handleDeleteConfirmation}
              currentUser={currentUser}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </>
  );
}
