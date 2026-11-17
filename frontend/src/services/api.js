const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const apiBaseUrl = configuredApiUrl
  ? /^https?:\/\//i.test(configuredApiUrl)
    ? configuredApiUrl
    : `https://${configuredApiUrl}`
  : import.meta.env.DEV
    ? "http://localhost:3002"
    : "";

const normalizedApiBaseUrl = apiBaseUrl.replace(/\/+$/, "");

export const apiUrl = (path) => {
  if (!normalizedApiBaseUrl) {
    throw new Error(
      "VITE_API_URL is missing. Set it to your Render backend URL and redeploy the frontend."
    );
  }

  return `${normalizedApiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};
