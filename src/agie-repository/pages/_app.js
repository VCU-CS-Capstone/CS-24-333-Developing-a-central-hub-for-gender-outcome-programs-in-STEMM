import "../styles/globals.css";
import { AuthProvider } from '../Auth/AuthContext';

export default function App({ Component, pageProps }) {
  return (
 
    <Component {...pageProps} />

  );
}

