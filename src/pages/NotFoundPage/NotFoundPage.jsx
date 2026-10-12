import { Link, useRouteError } from 'react-router-dom';
import { Result, Button } from 'antd';

export default function NotFoundPage() {
  const error = useRouteError();

  const status = error?.status ?? 404;
  const message = error?.data ?? error?.statusText ?? 'Страница не найдена';

  return (
    <Result
      status="404"
      title={status}
      subTitle={message}
      extra={
        <Link to="/">
          <Button type="primary">Вернуться в каталог</Button>
        </Link>
      }
    />
  );
}