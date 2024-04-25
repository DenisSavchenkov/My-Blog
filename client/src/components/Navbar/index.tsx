import { FC } from 'react';
import styles from './Navbar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/features/auth/authSlice';

const Navbar: FC = () => {
  const isAuth = useAppSelector((state) => Boolean(state.auth.token));
  const dispatch = useAppDispatch();

  const logoutHandler = (): void => {
    if (confirm('Вы действительно хотите выйти из своего профиля?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.title}>
        MY-BLOG
      </Link>
      {isAuth && (
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavLink
              to="/"
              className={styles.link}
              style={({ isActive }) =>
                isActive ? { color: '#ffffff' } : undefined
              }
            >
              Главная
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/posts"
              className={styles.link}
              style={({ isActive }) =>
                isActive ? { color: '#ffffff' } : undefined
              }
            >
              Мои посты
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink
              to="/new"
              className={styles.link}
              style={({ isActive }) =>
                isActive ? { color: '#ffffff' } : undefined
              }
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      {isAuth ? (
        <button onClick={logoutHandler} className={styles.button}>
          Выйти
        </button>
      ) : (
        <Link to="/auth/login" className={styles.button}>
          Войти
        </Link>
      )}
    </div>
  );
};

export default Navbar;
