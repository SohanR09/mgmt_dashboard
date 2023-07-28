export const ORGIN = window.location.origin;
export const HOST = window.location.hostname;
const BASE_URL = "/graphql";

export const TEST_DOMAIN = "http://localhost:3000";

let API_URL = ORGIN + BASE_URL;

if (HOST === "localhost") {
  API_URL = TEST_DOMAIN + BASE_URL;
} else {
  API_URL = ORGIN + BASE_URL;
}

export { API_URL };
