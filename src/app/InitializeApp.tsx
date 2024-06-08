import { ReactNode, useEffect, useState } from 'react';

function InitializeApp({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return null;
  }

  return children;
}

export default InitializeApp;
