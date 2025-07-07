type LogoutCallback = () => void;

let logoutCallback: LogoutCallback | null = null;

export function registerLogoutCallback(cb: LogoutCallback) {
  logoutCallback = cb;
}

export function triggerLogout() {
  if (logoutCallback) logoutCallback();
} 