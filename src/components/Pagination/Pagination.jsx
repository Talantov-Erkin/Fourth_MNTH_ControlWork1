import { Pagination as AntPagination } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useProductStore, LIMIT } from '../../Store/useProductStore';
import styles from './Pagination.module.scss';

export default function Pagination() {
  const total = useProductStore((s) => s.total);
  const page = useProductStore((s) => s.page);
  const [, setSearchParams] = useSearchParams();

  if (total <= LIMIT) return null;

  const handleChange = (nextPage) => {
    const next = new URLSearchParams(window.location.search);
    next.set('page', String(nextPage));
    setSearchParams(next);
  };

  return (
    <div className={styles.wrap}>
      <AntPagination
        current={page}
        pageSize={LIMIT}
        total={total}
        showSizeChanger={false}
        onChange={handleChange}
      />
    </div>
  );
}