import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Footer from "./Footer/Footer.jsx";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Login from './Login.jsx';
import Register from './Register.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import api from "../utils/api.js";
import * as auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";


export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipStatus, setTooltipStatus] = useState('');
 // Verificação do token no carregamento da aplicação
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
        .then((res) => {
          if (res) {
            setEmail(res.email);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.error('Token inválido:', err);
          // localStorage.removeItem('jwt');
        });
    }
    else{console.log('No token found');}
  }, []);
  
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch((err) => console.error(err));
    }
  }, [isLoggedIn]);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  const handleLogin = (email, password) => {
    return auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setEmail(email);
          setIsLoggedIn(true);
          return data;
        }
      })
      .catch((err) => {
        console.error('Erro no login:', err);
        throw err;
      });
  };

  const handleRegister = (email, password) => {
    return auth.register(email, password)
      .then(() => {
        setTooltipStatus('success');
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.error('Erro no registro:', err);
        setTooltipStatus('error');
        setIsInfoTooltipOpen(true);
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
      .catch((err) => console.error(err));
  };

  const handleUpdateAvatar = (data) => {
    return api.updateAvatar(data.avatar)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  };

  const handleCardLike = (card) => {
    const isLiked = card.isLiked;
    
    return api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => 
          state.map((currentCard) => 
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => console.error(err));
  };

  const handleCardDelete = (card) => {
    return api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(err));
  };

  const handleAddPlaceSubmit = (data) => {
    return api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((err) => console.error(err));
  };

  return (
    <CurrentUserContext.Provider value={{ 
      currentUser, 
      handleUpdateUser, 
      handleUpdateAvatar, 
      handleAddPlaceSubmit 
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
                  popup={popup}
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
              isLoggedIn ? 
                <Navigate to="/" replace /> : 
                <Login 
                onLogin={handleLogin}
                popup={popup}
                onClosePopup={handleClosePopup}
                />
            } 
          />
          
          <Route 
            path="/signup" 
            element={
              isLoggedIn ? 
                <Navigate to="/signin" replace /> : 
                <Register
                 onRegister={handleRegister} 
                 popup={popup}
                 onClosePopup={handleClosePopup}
                />
            } 
          />
          
          <Route 
            path="*" 
            element={
              isLoggedIn ? 
                <Navigate to="/" replace /> : 
                <Navigate to="/signin" replace />
            } 
          />
        </Routes>
        
        <Footer />
        
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={() => setIsInfoTooltipOpen(false)}
          status={tooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
