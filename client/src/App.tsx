// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { ProgressBarStyle, ScrollToTop, MotionLazyContainer } from './components';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <MotionLazyContainer>
        <ProgressBarStyle />
        <ScrollToTop />
        <Router />
      </MotionLazyContainer>
    </ThemeProvider>
  );
}
