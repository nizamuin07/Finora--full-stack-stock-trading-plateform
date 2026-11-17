const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiBaseUrl = configuredApiUrl
  ? /^https?:\/\//i.test(configuredApiUrl)
    ? configuredApiUrl
    : `https://${configuredApiUrl}`
  : import.meta.env.DEV
    ? "http://localhost:3002"
    : window.location.origin;

const normalizedApiBaseUrl = apiBaseUrl.replace(/\/+$/, "");

export const apiUrl = (path) => {
  return `${normalizedApiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
