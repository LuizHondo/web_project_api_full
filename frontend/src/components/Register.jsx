import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(formData.email, formData.password)
      .catch((err) => {
        console.error('Registration failed:', err);
      });
  };

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <h2 className="register__title">Sign up</h2>
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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="register__button">Sign up</button>
        <p className="register__text">
          Already a member?{' '}
          <Link to="/signin" className="register__link">
            Log in here!
          </Link>
        </p>
      </form>
    </div>
  );
}
