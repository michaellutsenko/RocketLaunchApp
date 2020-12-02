// Same logic as in reducers: I keep all of the actions in one
// place just because there's few of them. Of course with expansion
// it would've taken a more complex structure.
import is from 'is_js';

/**
 * Request the initial list of launches and save it to the store.
 * @param {String} query Search query.
 */
export const getLaunches = (query) => async (dispatch, getState, api) => {
  // Letting the app know to show loading indicators
  dispatch({ type: 'REQUEST_STARTED' });

  // The response will either have the information we need
  // or be empty iff there's an error. It is guaranteed to
  // return at least an empty object, hence no need to wrap it
  // with a try..catch block
  const response = await api.fetchLaunches(query);

  // An empty object in response means there's been an error
  // Errors are handled in api.js, this module only covers
  // store interactions. Thus, if there's an error, we should do nothing
  if (!is.empty(response)) {
    dispatch({
      type: 'LAUNCHES_LIST',
      launches: response.results,
      requestInfo: {
        next: response.next,
        loading: false,
      },
    });
  } else {
    dispatch({ type: 'REQUEST_FAILED' });
  }
};

export const getNextPage = () => async (dispatch, getState, api) => {
  const { next, loading } = getState().requestInfo;
  // If there's no next page URL or there's a request loading,
  // we should do nothing
  if (loading || !next) {
    return;
  }
  // Letting the app know to show loading indicators
  dispatch({ type: 'REQUEST_STARTED' });

  // Same logic here as in the function above
  const response = await api.fetchNextPage(next);
  // I'm repeating some code here and of course I know of DRY
  // but this is such an insignificant amount of code that
  // in a normal working environment I wouldn't be bothered.
  // There's benefit in DRY, but when you do it for every single
  // bit, you're just mindlessly following an ideology.
  //
  // Also, I can see a scenario, where this functionality would
  // expand and we'll actually need to change the structure of the
  // action in dispatch()
  if (!is.empty(response)) {
    dispatch({
      type: 'LAUNCHES_LIST_PAGE',
      launches: response.results,
      requestInfo: {
        next: response.next,
        loading: false,
      },
    });
  } else {
    dispatch({ type: 'REQUEST_FAILED' });
  }
};

/**
 * Add a launch to favourites.
 * No need for asynchronicity here, thus a simple action is returned.
 * @param {Object} launch Launch info object as received from the API
 */
export const addFavourite = (launch) => ({ type: 'FAVOURITES_ADD', launch });

/**
 * Remove a launch from favourites.
 * Same logic as above.
 * @param {Object} launch Launch info object as received from the API
 */
export const removeFavourite = (launch) => ({
  type: 'FAVOURITES_REMOVE',
  launch,
});
