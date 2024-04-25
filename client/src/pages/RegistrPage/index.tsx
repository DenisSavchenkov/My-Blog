import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegistrPage.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { registrUser } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const RegistrPage: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => Boolean(state.auth.token));
  const message = useAppSelector((state) => state.auth.message);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) toast(message), navigate('/');
  }, [isAuth, navigate, toast]);

  const onSubmitHandler = (): void => {
    dispatch(registrUser({ username, password }));
  };

  return (
    <div className={styles.registrPage}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
        <h3 className={styles.title}>Регистрация</h3>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className={styles.input}
          />
        </label>
        <div className={styles.formFooter}>
          <button
            onClick={onSubmitHandler}
            type="submit"
            className={styles.button}
          >
            Зарегистрироваться
          </button>
          <Link className={styles.text} to="/auth/login">
            Есть аккаунт?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrPage;
