import { useRouteError } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ServerErrorPage from '../ServerErrorPage/ServerErrorPage';

export default function ErrorPage() {
  const error = useRouteError();
  const status = error?.status ?? 500;

  if (status === 404) return <NotFoundPage />;
  return <ServerErrorPage />;
}