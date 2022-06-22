// scroll bar
import 'simplebar/src/simplebar.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'react-lazy-load-image-component/src/effects/black-and-white.css';

// lightbox
import 'react-image-lightbox/style.css';

// slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// contexts
import AuthStore from './contexts/AuthStore';
import { SettingsProvider } from './contexts/SettingsContext';
import { InjectedProvider } from './contexts/InjectedProviderContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';

// react query
import { QueryClient, QueryClientProvider } from 'react-query';

//
import App from './App';

// ----------------------------------------------------------------------

const queryClient = new QueryClient();

ReactDOM.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <InjectedProvider>
        <AuthStore>
          <SettingsProvider>
            <CollapseDrawerProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </CollapseDrawerProvider>
          </SettingsProvider>
        </AuthStore>
      </InjectedProvider>
    </QueryClientProvider>
  </HelmetProvider>,
  document.getElementById('root')
);
