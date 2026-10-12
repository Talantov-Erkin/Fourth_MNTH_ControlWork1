import { createBrowserRouter, Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import MainLayouts from './Layouts/MainLayouts';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductPage from './pages/ProductPage/ProductPage';
import { getProducts, getProduct } from './API/productApi';

export const LIMIT = 9;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,
    hydrateFallbackElement: <div>Загрузка приложения…</div>,
    errorElement: (
    <Result
      status="error"
      title="Что-то пошло не так"
      subTitle="Попробуйте вернуться в каталог"
      extra={<Link to="/"><Button type="primary">В каталог</Button></Link>}
    />
  ),
    children: [
      {
        index: true,
        element: <ProductListPage />,
        loader: async ({ request }) => {
          const sp = new URL(request.url).searchParams;

          const params = {
            page: Number(sp.get('page') ?? 1),
            limit: LIMIT,
            q: sp.get('q') ?? '',
            sortBy: sp.get('sortBy') ?? '',
            order: sp.get('order') ?? 'asc',
          };

          try {
            return await getProducts(params);
          } catch {
            throw new Response('Не удалось загрузить товары', { status: 500 });
          }
        },
        errorElement: (
          <Result
            status="500"
            title="Ошибка загрузки"
            extra={<Link to="/"><Button type="primary">Обновить</Button></Link>}
          />
        ),
      },
      {
        path: 'products/:id',
        element: <ProductPage />,
        loader: async ({ params }) => {
          try {
            return await getProduct(params.id);
          } catch (e) {
            if (e?.response?.status === 404) {
              throw new Response('Товар не найден', { status: 404 });
            }
            throw new Response('Ошибка загрузки', { status: 500 });
          }
        },
        errorElement: (
          <Result
            status="404"
            title="Товар не найден"
            extra={<Link to="/"><Button type="primary">В каталог</Button></Link>}
          />
        ),
      },
    ],
  },
]);