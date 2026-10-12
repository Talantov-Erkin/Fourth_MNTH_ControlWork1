import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "./Layouts/MainLayouts";
import ProductListPage from "./pages/ProductListPage/ProductListPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { useProductStore } from "./Store/useProductStore";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    hydrateFallbackElement: <div style={{ padding: 40 }}>Загрузка…</div>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
        loader: async ({ request }) => {
          const sp = new URL(request.url).searchParams;

          useProductStore.getState().setFilters({
            q: sp.get("q") ?? "",
            sortBy: sp.get("sortBy") ?? "",
            order: sp.get("order") ?? "asc",
            page: Number(sp.get("page") ?? 1),
          });

          try {
            await useProductStore.getState().fetchProducts();
          } catch {
            throw new Response("Не удалось загрузить товары", { status: 500 });
          }
          return null;
        },
      },
      {
        path: "products/:id",
        element: <ProductPage />,
        loader: async ({ params }) => {
          if (!params.id) {
            throw new Response("Товар не найден", { status: 404 });
          }
          try {
            await useProductStore.getState().fetchProduct(params.id);
          } catch (e) {
            if (e?.response?.status === 404) {
              throw new Response("Товар не найден", { status: 404 });
            }
            throw new Response("Ошибка загрузки", { status: 500 });
          }
          return null;
        },
        errorElement: <ErrorPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
