import '../styles/globals.css';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const threeScript = document.createElement('script');
    threeScript.setAttribute('id', 'threeScript');
    threeScript.setAttribute(
      'src',
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js'
    );
    document.getElementsByTagName('head')[0].appendChild(threeScript);

    const waves = document.createElement('script');
    waves.setAttribute('id', 'waves');
    waves.setAttribute(
      'src',
      'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js'
    );
    document.getElementsByTagName('head')[0].appendChild(waves);
    return () => {
      if (threeScript) {
        threeScript.remove();
        waves.remove();
      }
    };
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
