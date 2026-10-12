import { useLoaderData, useSearchParams } from 'react-router-dom';
import { Input, Select, Space, Empty, Row, Col, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductCard from '../../components/ProductCard/ProductCard';
import Pagination from '../../components/Pagination/Pagination';
import { LIMIT } from '../../router';
import styles from './ProductListPage.module.scss';

const { Title } = Typography;

export default function ProductListPage() {
  const { products, total } = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') ?? '';
  const sortBy = searchParams.get('sortBy') ?? '';
  const order = searchParams.get('order') ?? 'asc';
  const page = Number(searchParams.get('page') ?? 1);

  const updateParams = (patch) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(patch).forEach(([key, value]) => {
      if (value === '' || value == null) next.delete(key);
      else next.set(key, String(value));
    });
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

        <Select
          value={order}
          disabled={!sortBy}
          style={{ width: 200 }}
          onChange={(value) => updateParams({ order: value })}
          options={[
            { value: 'asc', label: 'По возрастанию' },
            { value: 'desc', label: 'По убыванию' },
          ]}
        />
      </Space>

      {products.length === 0 ? (
        <Empty description="Ничего не найдено" className={styles.empty} />
      ) : (
        <Row gutter={[16, 16]}>
          {products.map((p) => (
            <Col key={p.id} xs={24} sm={12} md={8}>
              <ProductCard product={p} />
            </Col>
          ))}
        </Row>
      )}

      <Pagination
        page={page}
        total={total}
        limit={LIMIT}
        onChange={(p) => updateParams({ page: p })}
      />
    </div>
  );
}