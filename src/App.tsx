import { Authenticator, Theme, ThemeProvider, useTheme } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Amplify } from 'aws-amplify';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AWS_Config } from './constants/awsConfig';
import './i18n';
import AppRouter from './router';
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

  const { tokens } = useTheme();


  const theme: Theme = {
    name: 'Auth Example Theme',
    tokens: {
      components: {
        authenticator: {
          router: {
            boxShadow: `0 0 16px ${tokens.colors.overlay['10']}`,
            borderWidth: '0',
          },
          form: {
            padding: `${tokens.space.medium} ${tokens.space.xl} ${tokens.space.medium}`,
          },
        },
        button: {
          primary: {
            backgroundColor: tokens.colors.neutral['100'],
          },
          link: {
            color: tokens.colors.purple['80'],
          },
        },
        fieldcontrol: {
          _focus: {
            boxShadow: `0 0 0 2px ${tokens.colors.purple['60']}`,
          },
        },
        tabs: {
          item: {
            color: tokens.colors.neutral['80'],
            _active: {
              borderColor: tokens.colors.neutral['100'],
              color: tokens.colors.purple['100'],
            },
          },
        },
      },
    },
  };

  return (
    <>
      <ThemeProvider theme={theme} colorMode='light' >
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <Authenticator>

              <BrowserRouter>
                <AppRouter />
              </BrowserRouter>

            </Authenticator>
          </QueryClientProvider >
        </ThemeProvider>
      </ThemeProvider>
    </>
  )
}

export default App
