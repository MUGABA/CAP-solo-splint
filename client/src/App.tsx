import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/styles';
import './App.css';
import { AuthProvider } from './context/useAuthContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import { SocketProvider } from './context/useSocketContext';
import AuthLayout from './pages/AuthLayout/AuthLayout';
import { theme } from './themes/theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <AuthProvider>
          <SocketProvider>
            <CssBaseline />
            <AuthLayout />
          </SocketProvider>
        </AuthProvider>
      </SnackBarProvider>
    </ThemeProvider>
  );
}

export default App;
