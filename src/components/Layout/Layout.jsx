import { Outlet } from 'react-router-dom';
import { Layout as AntLayout } from 'antd';
import styles from './Layout.module.scss';

const { Header, Content, Footer } = AntLayout;

export default function Layout() {
  return (
    <AntLayout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.brand}> Магазин техники</div>
      </Header>

      <Content className={styles.content}>
        <Outlet />
      </Content>

      <Footer className={styles.footer}>
         {new Date().getFullYear()} Dummy Shop
      </Footer>
    </AntLayout>
  );
}