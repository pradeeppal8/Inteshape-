const isProduction = process.env.NODE_ENV === "production";

const rawApiUrl = isProduction
  ? process.env.REACT_APP_API_URL_PROD
  : process.env.REACT_APP_API_URL_DEV;

const apiUrl = (rawApiUrl || "http://localhost:5000").replace(/\/+$/, "");

const config = {
  apiUrl,
};

export default config;