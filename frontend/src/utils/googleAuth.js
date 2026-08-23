/**
 * Google Identity Services & OAuth 2.0 Integration Helper for HireShield
 */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1033247490719-vonvno1oald8unlmkr701ev73mldjere.apps.googleusercontent.com';

let tokenClientInstance = null;

/**
 * Ensures Google Identity Services script is preloaded immediately.
 */
export function loadGoogleScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    if (window.google?.accounts) {
      resolve(window.google);
      return;
    }

    const existing = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google));
      existing.addEventListener('error', () => resolve(null));
      if (window.google?.accounts) {
        resolve(window.google);
        return;
      }
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(window.google);
    script.onerror = () => resolve(null);
    document.head.appendChild(script);
  });
}

// Preload script immediately when module is imported
if (typeof window !== 'undefined') {
  loadGoogleScript();
}

/**
 * Triggers Google OAuth 2.0 interactive popup instantly on user click
 */
export function triggerGoogleOAuth({ onToken, onError, onStart }) {
  if (onStart) onStart();

  if (window.google?.accounts?.oauth2) {
    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_CLIENT_ID,
        scope: 'email profile openid',
        callback: async (response) => {
          if (response && response.access_token) {
            if (onToken) onToken(response.access_token);
          } else if (response && response.error) {
            let msg = response.error_description || response.error;
            if (response.error === 'access_denied') {
              msg = 'Google Sign-In was cancelled or access was denied.';
            } else if (response.error === 'origin_mismatch') {
              msg = 'Origin mismatch: Please add your domain to Authorized JavaScript Origins in Google Cloud Console.';
            }
            if (onError) onError(msg);
          }
        },
        error_callback: (nonOAuthErr) => {
          let msg = 'Google Sign-In window closed or blocked.';
          if (nonOAuthErr?.type === 'popup_failed_to_open') {
            msg = 'Popup was blocked by your browser. Please allow popups for this site.';
          } else if (nonOAuthErr?.message) {
            msg = nonOAuthErr.message;
          }
          if (onError) onError(msg);
        }
      });

      // Synchronously request access token to guarantee popup opens immediately
      client.requestAccessToken({ prompt: 'select_account' });
      return;
    } catch (err) {
      console.warn('OAuth launch notice:', err);
    }
  }

  // If not yet loaded, load and then trigger
  loadGoogleScript().then(() => {
    if (window.google?.accounts?.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          callback: async (response) => {
            if (response && response.access_token) {
              if (onToken) onToken(response.access_token);
            }
          },
          error_callback: (err) => {
            if (onError) onError(err?.message || 'Google popup closed.');
          }
        });
        client.requestAccessToken({ prompt: 'select_account' });
      } catch (e) {
        if (onError) onError('Could not launch Google Sign-In.');
      }
    } else {
      if (onError) onError('Google Identity Services is loading. Please try again.');
    }
  });
}

/**
 * Renders the official Google Sign-In button into a container element
 */
export async function renderOfficialGoogleButton(containerElement, { onCredential, authMode = 'signin' }) {
  if (!containerElement) return;

  await loadGoogleScript();

  if (!window.google?.accounts?.id) return;

  try {
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (response) => {
        if (response.credential && onCredential) {
          onCredential(response.credential);
        }
      },
      auto_select: false
    });

    containerElement.innerHTML = '';
    window.google.accounts.id.renderButton(containerElement, {
      theme: 'filled_black',
      size: 'large',
      shape: 'rectangular',
      width: Math.min(containerElement.offsetWidth || 340, 360),
      text: authMode === 'signup' ? 'signup_with' : 'signin_with'
    });
  } catch (err) {
    console.warn('Official Google button render notice:', err);
  }
}

export { GOOGLE_CLIENT_ID };
