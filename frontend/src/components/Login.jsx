import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
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
    onLogin(formData.email, formData.password)
      .catch((err) => {
        console.error('Login failed:', err);
        // You can add error handling here
      });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Entrar</h2>
        <input 
          type="email" 
          name="email"
          className="login__email login__input" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input 
          type="password" 
          name="password"
          className="login__password login__input" 
          placeholder="Senha" 
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <button type="submit" className="login__button">Entrar</button>
        <p className="login__text">
          Ainda não é membro?{' '}
          <Link to="/signup" className="login__link">
            Inscreva-se aqui!
          </Link>
        </p>
      </form>
    </div>
  );
}