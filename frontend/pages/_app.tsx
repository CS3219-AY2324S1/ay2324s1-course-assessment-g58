import '../styles/globals.css'; 
import { AppProps } from 'next/app';
import MainContext from '../contexts/MainContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainContext>
      <div className="app-container p-4">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </MainContext>
  );
}

export default MyApp;