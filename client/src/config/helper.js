const TEST_DOMAIN = "http://localhost:8000";
const ORIGIN_DOMAIN = window.location.origin;

let END_POINT;
if (window.location.origin.includes("localhost")) {
  END_POINT = TEST_DOMAIN + "/graphql";
} else {
  END_POINT = ORIGIN_DOMAIN + "/graphql";
}

export { END_POINT };
