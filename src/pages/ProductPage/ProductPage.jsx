import { Link, useLoaderData } from 'react-router-dom';
import { Breadcrumb, Typography, Rate, Tag, Button, Image, Descriptions, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import styles from './ProductPage.module.scss';

const { Title, Text } = Typography;

export default function ProductPage() {
  const product = useLoaderData();
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
          <Image.PreviewGroup>
            {gallery.map((src, i) => (
              <Image key={i} src={src} alt={`${title} ${i + 1}`} className={styles.image} />
            ))}
          </Image.PreviewGroup>
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