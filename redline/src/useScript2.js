import { useEffect } from 'react';

const useScript2 = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'http://www.carqueryapi.com/js/carquery.0.3.4.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript2;