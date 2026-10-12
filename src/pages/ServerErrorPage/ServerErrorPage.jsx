import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

export default function ServerErrorPage() {
  return (
    <Result
      status="500"
      title="500"
      subTitle="На сервере что-то пошло не так. Попробуйте позже."
      extra={
        <Link to="/">
          <Button type="primary">Вернуться в каталог</Button>
        </Link>
      }
    />
  );
}