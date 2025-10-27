import { useState, useEffect, useRef  } from 'react';
import { Alert } from '@heroui/alert';

export default function NetworkStatusAlert() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showRestoreAlert, setShowRestoreAlert] = useState(false);
	const timerRef = useRef(null); // ✅ persist timer across renders

  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      setShowRestoreAlert(true);

       // Clear any existing timer before setting a new one
      if (timerRef.current) clearTimeout(timerRef.current);

      // Auto-hide after 8 seconds
      timerRef.current = setTimeout(() => {
        setShowRestoreAlert(false);
      }, 8000);
    };

    const goOffline = () => {
      setIsOnline(false);
      setShowRestoreAlert(false);
		
      // Clear any pending timer so it doesn’t trigger when still offline
      if (timerRef.current) clearTimeout(timerRef.current);
    };

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    // ✅ Fallback check every 5 seconds — ensures status updates even if browser event doesn’t fire
    // const interval = setInterval(() => {
    //   if (navigator.onLine !== isOnline) {
    //     if (navigator.onLine) goOnline();
    //     else goOffline();
    //   }
    // }, 5000);

		return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (isOnline && !showRestoreAlert) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none animate__animated animate__fadeInDown">
      <div className="w-full max-w-2xl pointer-events-auto">
        <Alert
          color={isOnline ? 'success' : 'danger'}
          variant="faded"
          radius="full"
					title={
            isOnline
              ? "Back online. connection restored."
              : "You're offline, some features may be unavailable."
          }
        />
      </div>
    </div>
  );
}
