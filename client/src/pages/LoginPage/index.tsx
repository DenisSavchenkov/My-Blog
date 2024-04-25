import { FC, useEffect, useState } from 'react';
import styles from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { loginUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const LoginPage: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => Boolean(state.auth.token));
  const message = useAppSelector((state) => state.auth.message);

  useEffect(() => {
    if (isAuth) navigate('/'), toast(message);
  }, [isAuth, navigate, toast]);

  const onSubmitHandler = (): void => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className={styles.loginPage}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <h3 className={styles.title}>Авторизация</h3>
        <label className={styles.label}>
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </label>
        <div className={styles.formFooter}>
          <button
            onClick={onSubmitHandler}
            type="submit"
            className={styles.button}
          >
            Войти
          </button>
          <Link className={styles.text} to="/auth/registration">
            Нет аккаунта?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
