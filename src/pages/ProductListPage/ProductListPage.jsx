import { useSearchParams } from 'react-router-dom';
import { Input, Select, Space, Empty, Row, Col, Typography, Alert } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import { useProductStore } from '../../Store/useProductStore';
import styles from './ProductListPage.module.scss';

const { Title } = Typography;

export default function ProductListPage() {
  const [, setSearchParams] = useSearchParams();

  const products = useProductStore((s) => s.products);
  const q = useProductStore((s) => s.q);
  const sortBy = useProductStore((s) => s.sortBy);
  const order = useProductStore((s) => s.order);
  const listError = useProductStore((s) => s.listError);

  const updateParams = (patch) => {
    const next = new URLSearchParams(window.location.search);

    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value == null) next.delete(key);
      else next.set(key, String(value));
    });

    if ('sortBy' in patch && !patch.sortBy) next.delete('order');
    if (!('page' in patch)) next.set('page', '1');

    setSearchParams(next);
  };

  return (
    <div className={styles.page}>
      <Title level={2} className={styles.heading}>Магазин техники</Title>

      <Space wrap size="middle" className={styles.toolbar}>
        <Input.Search
          placeholder="Поиск: phone, laptop…"
          allowClear
          defaultValue={q}
          enterButton={<SearchOutlined />}
          onSearch={(value) => updateParams({ q: value.trim() })}
          className={styles.search}
        />

        <Select
          value={sortBy || undefined}
          placeholder="Сортировка"
          allowClear
          style={{ width: 200 }}
          onChange={(value) => updateParams({ sortBy: value ?? '' })}
          options={[
            { value: 'title', label: 'По названию' },
            { value: 'price', label: 'По цене' },
            { value: 'rating', label: 'По рейтингу' },
          ]}
        />

        {sortBy && (
          <Select
            value={order}
            style={{ width: 200 }}
            onChange={(value) => updateParams({ order: value })}
            options={[
              { value: 'asc', label: 'По возрастанию' },
              { value: 'desc', label: 'По убыванию' },
            ]}
          />
        )}
      </Space>

      {listError && <Alert type="error" message={listError} showIcon className={styles.alert} />}

      {products.length === 0 && !listError ? (
        <Empty description="Ничего не найдено" className={styles.empty} />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((p) => (
            <Col key={p.id} xs={24} sm={12} md={8}>
              <ProductCard id={p.id} />
            </Col>
          ))}
        </Row>
      )}

      <Pagination />
    </div>
  );
}