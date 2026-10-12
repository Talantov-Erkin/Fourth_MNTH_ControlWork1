import { Link } from 'react-router-dom';
import { Card, Tag, Rate, Typography } from 'antd';
import { useProductStore } from '../../Store/useProductStore';
import styles from './ProductCard.module.scss';

const { Title, Text } = Typography;

export default function ProductCard({ id }) {
  // точечный селектор — компонент перерисуется только если этот товар изменится
  const product = useProductStore((s) => s.products.find((p) => p.id === id));

  if (!product) return null;

  const { title, thumbnail, price, rating, brand, stock } = product;

  return (
    <Link to={`/products/${id}`} className={styles.link}>
      <Card
        hoverable
        className={styles.card}
        cover={
          <div className={styles.cover}>
            <img src={thumbnail} alt={title} loading="lazy" />
          </div>
        }
      >
        <Title level={5} ellipsis={{ rows: 2 }} className={styles.title}>
          {title}
        </Title>

        {brand && <Text type="secondary" className={styles.brand}>{brand}</Text>}

        <div className={styles.ratingRow}>
          <Rate disabled allowHalf defaultValue={Math.round(rating * 2) / 2} />
          <Text type="secondary">{rating}</Text>
        </div>

        <div className={styles.bottomRow}>
          <Text strong className={styles.price}>{price} $</Text>
          <Tag color={stock > 0 ? 'green' : 'red'}>
            {stock > 0 ? `В наличии: ${stock}` : 'Нет'}
          </Tag>
        </div>
      </Card>
    </Link>
  );
}