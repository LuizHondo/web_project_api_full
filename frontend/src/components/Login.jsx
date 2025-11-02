import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login({ onLogin }) {
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
    onLogin(formData.email, formData.password)
      .catch((err) => {
        console.error('Login failed:', err);
      });
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <h2 className="login__title">Sign in</h2>
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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login__button">Sign in</button>
        <p className="login__text">
          Not a member yet?{' '}
          <Link to="/signup" className="login__link">
            Register here!
          </Link>
        </p>
      </form>
    </div>
  );
}
