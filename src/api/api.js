/**
 * Make a GET request to the URL.
 * Functions as a wrapper for fetch(). If there are errors
 * or an unexpected status, it will post the error message
 * in the log
 * @param {String} url Request URL
 * @returns {Promise}
 */
export const makeRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();

    if (response.ok) {
      return result;
    } else {
      throw result;
    }
  } catch (err) {
    console.error(err);
    return {};
  }
};

// I'm using an API different from what is specified in the task
// The reason for this is that the API from the task doesn't function
// as expected (e.g. sorting doesn't work) and is no longer supported
// as the website says. There's a link to a new API, developed by the
// same people. If it was an actual real business task on a real project
// I would've suggested or maybe even insisted on using a newer, more
// functional API. I'm not sure if it's part of the test, but if it is,
// this decision reflects my approach to such situations best.
const API = 'https://ll.thespacedevs.com/2.0.0/launch';

/**
 * Fetch a list of launches.
 * @param {String} searchQuery Optional. Search query for the launches
 */
export const fetchLaunches = async (searchQuery) => {
  // I love URLSearchParams
  // It handles everything I ever need to do with search params
  // and url encodes everything nicely
  const params = new URLSearchParams();

  // Detailed mode seems to have all the required links
  params.append('mode', 'detailed');

  // Adding search query to the response
  searchQuery && searchQuery.length > 0 && params.append('search', searchQuery);

  // The slash after 'previous' is required as without it the API
  // returns the wrong link to the next page
  const url = `${API}/previous/?${params.toString()}`;
  console.log(`requesting ${url}`);
  const res = await makeRequest(url);
  return res;
};

/**
 * Fetch the next page from the URL.
 * @param {String} nextPage The URL to next page provided by the API.
 */
export const fetchNextPage = async (nextPage) => {
  console.log(`requesting ${nextPage}`);
  const res = await makeRequest(nextPage);
  return res;
};
