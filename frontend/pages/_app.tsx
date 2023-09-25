import '../styles/globals.css'; 
import { AppProps } from 'next/app';
import MainContext from '../contexts/MainContext';
import NavigationBar from '@/components/NavigationBar/NavigationBar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainContext>
      <div className="app-container h-[100vh]">
        <NavigationBar /> 
        {/* NavBar 6vh */}
        <main className='p-4 h-[calc(100vh-50px)]'>
          <Component {...pageProps} />
        </main>
      </div>
    </MainContext>
  );
}

export default MyApp;