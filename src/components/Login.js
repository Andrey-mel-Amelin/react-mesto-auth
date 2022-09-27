import { useEffect, useState } from 'react';
import '../index.css';

function Login({ onLogin, setLoggedForm }) {
  const cleanUserData = {
    password: '',
    email: '',
  };

  useEffect(() => {
    setLoggedForm(true);
  }, []);

  const [userData, setUserData] = useState(cleanUserData);

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((old) => ({
      ...old,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const { email, password } = userData;

    if (!email || !password) return;

    onLogin(password, email).catch((err) => {
      console.log(err);
      setUserData((old) => ({
        ...old,
        message: 'Что-то пошло не так!',
      }));
    });
  }

  return (
    <form className="form form_for_authorize" onSubmit={handleSubmit}>
      <p className="form__title form__title_for_authorize">Вход</p>
      <input
        className="form__input form__input_for_authorize"
        required
        id="email"
        placeholder="Email"
        name="email"
        type="text"
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
        Войти
      </button>
    </form>
  );
}

export default Login;
