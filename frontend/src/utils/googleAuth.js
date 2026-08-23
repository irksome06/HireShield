/**
 * Google Identity Services & OAuth 2.0 Integration Helper for HireShield
 */

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1033247490719-vonvno1oald8unlmkr701ev73mldjere.apps.googleusercontent.com';

/**
 * Ensures Google Identity Services script is loaded in the DOM.
 */
export function loadGoogleScript() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts) {
      resolve(window.google);
      return;
    }

    const existing = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google));
      existing.addEventListener('error', () => reject(new Error('Google Identity Services script failed to load. Please check adblockers.')));
      // Check if already loaded
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
    script.onerror = () => reject(new Error('Unable to connect to accounts.google.com. Please check your network or disable Brave Shields / AdBlockers.'));
    document.head.appendChild(script);
  });
}

/**
 * Triggers Google OAuth 2.0 interactive authorization popup
 */
export async function triggerGoogleOAuth({ onToken, onError, onStart }) {
  if (onStart) onStart();

  try {
    await loadGoogleScript();
  } catch (err) {
    if (onError) onError(err.message || 'Google Identity SDK could not be loaded.');
    return;
  }

  if (!window.google?.accounts?.oauth2) {
    if (onError) onError('Google OAuth2 SDK is not ready. Please try again.');
    return;
  }

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
            msg = 'Google OAuth Error: Origin mismatch. Please add your current domain to Authorized JavaScript Origins in Google Cloud Console.';
          }
          if (onError) onError(msg);
        }
      },
      error_callback: (nonOAuthErr) => {
        let msg = 'Google Sign-In popup was closed or blocked by browser.';
        if (nonOAuthErr?.type === 'popup_failed_to_open') {
          msg = 'Google popup was blocked by your browser. Please allow popups for this site.';
        } else if (nonOAuthErr?.message) {
          msg = nonOAuthErr.message;
        }
        if (onError) onError(msg);
      }
    });

    client.requestAccessToken({ prompt: 'select_account' });
  } catch (err) {
    console.error('OAuth launch error:', err);
    if (onError) onError(err.message || 'Failed to open Google Sign-In.');
  }
}

/**
 * Renders the official Google Sign-In button into a container element
 */
export async function renderOfficialGoogleButton(containerElement, { onCredential, authMode = 'signin' }) {
  if (!containerElement) return;

  try {
    await loadGoogleScript();
  } catch (err) {
    console.warn('Official button script load warning:', err);
    return;
  }

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
    console.warn('Failed to render official Google button:', err);
  }
}

export { GOOGLE_CLIENT_ID };
