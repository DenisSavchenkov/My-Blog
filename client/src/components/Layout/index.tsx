import { FC, ReactNode } from 'react';
import Navbar from '../Navbar';
import styles from './Layout.module.scss';

interface LayoutType {
  children: ReactNode;
}

const Layout: FC<LayoutType> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
