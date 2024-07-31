import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AWS_Config } from './constants/awsConfig';
import './i18n';
import AppRouter from './router';
import { theme } from './theme/theme';
import './theme/theme.css';

function App() {

  Amplify.configure(AWS_Config);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        retryDelay: 2000,
      }
    },
  });

  return (
    <>
      <ThemeProvider theme={theme} colorMode="light">

        <Authenticator>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AppRouter />
            </BrowserRouter>
          </QueryClientProvider >
        </Authenticator>

      </ThemeProvider>
    </>
  )
}

export default App
