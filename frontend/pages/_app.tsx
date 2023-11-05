import '../styles/globals.css'; 
import { AppProps } from 'next/app';
import MainContext from '../contexts/MainContext';
import NavigationBar from '@/components/NavigationBar/NavigationBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainContext>
      <div>
        <NavigationBar /> 
        {/* NavBar 6vh */}
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </MainContext>
  );
}

export default MyApp;