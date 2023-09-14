import '../styles/globals.css'; 
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="app-container p-4">
      <main>
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;