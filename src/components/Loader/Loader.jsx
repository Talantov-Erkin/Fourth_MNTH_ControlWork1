import { Spin } from 'antd';
import styles from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <Spin size="large" tip="Загрузка…" />
    </div>
  );
}