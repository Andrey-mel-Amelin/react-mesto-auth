import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

function Register({ onRegister, setLoggedForm }) {
  const [userData, setUserData] = useState({
    password: '',
    email: '',
  });

  useEffect(() => {
    setLoggedForm(false)
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { password, email } = userData;

    onRegister(password, email).catch((err) => {
      console.log(err);

      setUserData((old) => ({
        ...old,
        message: 'Что-то пошло не так!',
      }));
    });
  }

  return (
    <form className="form form_for_authorize" onSubmit={handleSubmit}>
      <p className="form__title form__title_for_authorize">Регистрация</p>
      <input
        className="form__input form__input_for_authorize"
        required
        id="email"
        placeholder="Email"
        name="email"
        type="email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        className="form__input form__input_for_authorize"
        required
        id="password"
        placeholder="Пароль"
        name="password"
        type="password"
        value={userData.password}
        onChange={handleChange}
      />
      <button className="form__submit form__submit_for_authorize" type="submit" onSubmit={handleSubmit}>
        Зарегистрироваться
      </button>
      <p className="form__signin">
        Уже зарегистрированы?&nbsp;
        <Link className="form__login-link" to="/sign-in">
          Войти
        </Link>
      </p>
    </form>
  );
}

export default Register;
