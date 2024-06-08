import { ReactNode, useCallback, useEffect, useState } from 'react';
import { initializeStores } from '@/core/stores';
import { appLog } from '@/core/libs';

function InitializeApp({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  const initialize = useCallback(async () => {
    await initializeStores();
    setReady(true);
  }, []);

  useEffect(() => {
    initialize().catch((e) => {
      appLog.error(e, 'App initialized has error');
    });
  }, [initialize]);

  if (!ready) {
    return null;
  }

  return children;
}

export default InitializeApp;
