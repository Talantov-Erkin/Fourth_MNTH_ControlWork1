import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Typography, Rate, Tag, Button, Descriptions, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useProductStore } from '../../Store/useProductStore';
import styles from './ProductPage.module.scss';

const { Title, Text } = Typography;

export default function ProductPage() {
  const { id } = useParams();
  const product = useProductStore((s) => s.current);
  const currentError = useProductStore((s) => s.currentError);

  if (currentError) return null; 
  if (!product) return null;     

  const { title, images, thumbnail, price, rating, brand, category, stock, description } = product;
  const gallery = images?.length ? images : [thumbnail];

  return (
    <div className={styles.page}>
      <Breadcrumb
        items={[
          { title: <Link to="/">Каталог</Link> },
          { title: category },
          { title },
        ]}
        className={styles.breadcrumb}
      />

      <Link to="/" className={styles.back}>
        <ArrowLeftOutlined /> Назад к списку
      </Link>

      <div className={styles.detail}>
        <div className={styles.gallery}>
          {gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${title} ${i + 1}`}
              className={styles.image}
            />
          ))}
        </div>

        <div className={styles.info}>
          <Title level={2}>{title}</Title>
          {brand && <Text type="secondary">Бренд: {brand}</Text>}

          <div className={styles.meta}>
            <Text type="secondary">Категория: {category}</Text>
            <Tag color={stock > 0 ? 'green' : 'red'}>
              {stock > 0 ? `В наличии: ${stock} шт.` : 'Нет в наличии'}
            </Tag>
          </div>

          <div className={styles.ratingRow}>
            <Rate disabled allowHalf defaultValue={Math.round(rating * 2) / 2} />
            <Text>{rating}</Text>
          </div>

          <Title level={3} className={styles.price}>{price} $</Title>

          <Divider />

          <Descriptions column={1} size="small">
            <Descriptions.Item label="Описание">{description}</Descriptions.Item>
          </Descriptions>

          <Button type="primary" size="large" disabled={stock === 0} className={styles.buy}>
            {stock > 0 ? 'Купить' : 'Нет в наличии'}
          </Button>
        </div>
      </div>
    </div>
  );
}