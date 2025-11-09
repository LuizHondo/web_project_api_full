import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Footer from './Footer/Footer.jsx';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Popup from './Popup/Popup.jsx';
import LoginStatusPopup from './LoginStatusPopup.jsx';
import api from '../utils/api.js';
import * as auth from '../utils/auth.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.log('No token found');
      return;
    }

    auth.checkToken(token)
      .then((res) => {
        if (res) {
          setEmail(res.email);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => {
        console.error('Invalid token:', err);
      });
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        const normalizedCards = (cardsData || []).map((card) => ({
          ...card,
          isLiked: Array.isArray(card.likes)
            ? card.likes.some((id) => String(id) === String(userData._id))
            : Boolean(card.isLiked),
        }));
        setCards(normalizedCards);
      })
      .catch((err) => console.error('Error loading initial data:', err));
  }, [isLoggedIn]);

  const handleOpenPopup = (nextPopup) => {
    setPopup(nextPopup);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  const showInfoPopup = (status, customMessage) => {
    handleOpenPopup({
      title: null,
      children: (
        <LoginStatusPopup status={status} message={customMessage} />
      ),
    });
  };

  const handleLogin = (userEmail, password) => {
    return auth.authorize(userEmail, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setEmail(userEmail);
          setIsLoggedIn(true);
        }
        return data;
      })
      .catch((err) => {
        console.error('Login error:', err);
        showInfoPopup('error', 'Invalid email or password.');
        throw err;
      });
  };

  const handleRegister = (userEmail, password) => {
    return auth.register(userEmail, password)
      .then(() => {
        showInfoPopup('success', 'Registration successful! You can now log in.');
      })
      .catch((err) => {
        console.error('Registration error:', err);
        showInfoPopup('error', err?.message === 'Email already in use.'
          ? 'Email is already registered. Try signing in instead.'
          : 'Oops, something went wrong. Please try again.');
        throw err;
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    setEmail('');
    setCards([]);
  };

  const handleUpdateUser = (data) => {
    return api.updateProfile(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.error('Profile update error:', err));
  };

  const handleUpdateAvatar = (data) => {
    return api.updateAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.error('Avatar update error:', err));
  };

  const handleCardLike = (card) => {
    const isLiked = Boolean(card.isLiked);
    return api.toggleLike(card._id, isLiked)
      .then((updated) => {
        const newCard = {
          ...updated,
          isLiked: Array.isArray(updated.likes)
            ? updated.likes.some((id) => String(id) === String(currentUser._id))
            : Boolean(updated.isLiked),
        };
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => console.error('Toggle like error:', err));
  };

  const handleCardDelete = (card) => {
    return api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error('Delete card error:', err));
  };

  const handleAddPlaceSubmit = (data) => {
    return api.addCard(data)
      .then((created) => {
        const newCard = {
          ...created,
          isLiked: Array.isArray(created.likes)
            ? created.likes.some((id) => String(id) === String(currentUser._id))
            : false,
        };
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((err) => console.error('Add card error:', err));
  };

  return (
    <CurrentUserContext.Provider value={{
      currentUser,
      handleUpdateUser,
      handleUpdateAvatar,
      handleAddPlaceSubmit,
    }}>
      <div className="page">
        <Header
          email={email}
          onSignOut={handleSignOut}
          isLoggedIn={isLoggedIn}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  onCardAddSubmit={handleAddPlaceSubmit}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              isLoggedIn
                ? <Navigate to="/" replace />
                : (
                  <Login
                    onLogin={handleLogin}
                  />
                )
            }
          />

          <Route
            path="/signup"
            element={
              isLoggedIn
                ? <Navigate to="/" replace />
                : (
                  <Register
                    onRegister={handleRegister}

                  />
                )
            }
          />

          <Route
            path="*"
            element={
              isLoggedIn
                ? <Navigate to="/" replace />
                : <Navigate to="/signin" replace />
            }
          />
        </Routes>

        <Footer />

        {popup && (
          <Popup onClose={handleClosePopup} title={popup.title}>
            {popup.children}
          </Popup>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}




