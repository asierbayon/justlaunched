import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import { LoadingScreen } from '../components/LoadingScreen';
import { Product } from 'src/pages/Product';
import { User } from 'src/pages/User';
import UserAccount from 'src/pages/UserSettings';
import Home from 'src/pages/Feed';
import AuthGuard from 'src/guards/AuthGuard';
import ProductSettings from 'src/pages/ProductSettings';
import ProductCreation from 'src/pages/ProductCreation';
import UserProducts from 'src/pages/UserProducts';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/home" replace />, index: true },
        { path: '/home', element: <Home /> },
        {
          path: '/list-product',
          element: (
            <AuthGuard>
              <ProductCreation />
            </AuthGuard>
          ),
        },
        { path: '/product/:alias', element: <Product /> },
        {
          path: '/product/:alias/edit',
          element: (
            <AuthGuard>
              <ProductSettings />
            </AuthGuard>
          ),
        },
        { path: '/user/:address', element: <User /> },
        {
          path: '/user/:address/products',
          element: (
            <AuthGuard>
              <UserProducts />
            </AuthGuard>
          ),
        },
        {
          path: '/user/:address/edit',
          element: (
            <AuthGuard>
              <UserAccount />
            </AuthGuard>
          ),
        },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// Dashboard
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
