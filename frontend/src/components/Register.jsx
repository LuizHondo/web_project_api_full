import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData.email, formData.password)
      .catch((err) => {
        console.error('Registration failed:', err);
        // Error handling is done in the parent component
      });
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Inscrever-se</h2>
        <input 
          type="email" 
          name="email"
          className="register__email register__input" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input 
          type="password" 
          name="password"
          className="register__password register__input" 
          placeholder="Senha" 
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <button type="submit" className="register__button">Inscrever-se</button>
        <p className="register__text">
          Já é um membro?{' '}
          <Link to="/signin" className="register__link">
            Faça o login aqui!
          </Link>
        </p>
      </form>
    </div>
  );
}
