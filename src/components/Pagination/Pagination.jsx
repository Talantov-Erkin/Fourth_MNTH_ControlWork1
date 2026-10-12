import { Pagination as AntPagination } from 'antd';

export default function Pagination({ page, total, limit, onChange }) {
  if (total <= limit) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '28px 0' }}>
      <AntPagination
        current={page}
        pageSize={limit}
        total={total}
        showSizeChanger={false}
        onChange={onChange}
      />
    </div>
  );
}