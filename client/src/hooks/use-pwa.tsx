import { useState, useEffect } from "react";

export function usePWA() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Delay service worker registration until after page load for better performance
    const registerServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        // Use requestIdleCallback if available, otherwise use setTimeout
        const register = () => {
          navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
              console.log('SW registered: ', registration);
              
              // Set up periodic background sync for supported browsers
              if ('periodicSync' in registration) {
                registration.periodicSync.register('countdown-update', {
                  minInterval: 24 * 60 * 60 * 1000, // 24 hours
                }).catch((err) => {
                  console.log('Periodic sync registration failed:', err);
                });
              }
            })
            .catch((registrationError) => {
              console.log('SW registration failed: ', registrationError);
            });

          // Listen for service worker messages
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data.type === 'COUNTDOWN_UPDATE_REQUIRED') {
              // Trigger page refresh to update countdown
              window.location.reload();
            }
          });
        };

        // Delay registration to not block initial render
        if ('requestIdleCallback' in window) {
          requestIdleCallback(register);
        } else {
          setTimeout(register, 1000); // Wait 1 second
        }
      }
    };

    // Register service worker after page has loaded
    if (document.readyState === 'complete') {
      registerServiceWorker();
    } else {
      window.addEventListener('load', registerServiceWorker);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    // Check if already installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const showInstallPrompt = async () => {
    if (!installPrompt) return;

    const result = await installPrompt.prompt();
    console.log('Install prompt result:', result);
    
    setInstallPrompt(null);
  };

  return {
    installPrompt,
    isInstalled,
    showInstallPrompt
  };
}
