import { useEffect } from 'react';

const useScript = url => {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = 'http://www.carqueryapi.com/js/jquery.min.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [url]);
};

export default useScript;