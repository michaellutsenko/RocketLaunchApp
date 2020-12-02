// I decided to keep all reducers in one module just because
// the reducers are relatively small. Creating a complex folder
// structure for these would've been overkill

// My standard approach to naming action types in redux is:
// UNIT_SUBUNIT_ACTION(_WITH_MANY_WORDS_IN_ITS_NAME)
// Or in case there are no subunits, drop the subunit name

export const launchesReducer = (state = [], action) => {
  switch (action.type) {
    case 'LAUNCHES_LIST':
      return action.launches;
    case 'LAUNCHES_LIST_PAGE':
      return [...state, ...action.launches];
    default:
      return state;
  }
};

// I ultimately decided to save favourites locally into a persistent reducer
// The alternative to it would've been to keep IDs locally and then fetching
// them one by one from the API as the API doesn't allow loading predefined
// batches
export const favouritesReducer = (state = [], action) => {
  switch (action.type) {
    case 'FAVOURITES_ADD':
      return [...state, action.launch];
    case 'FAVOURITES_REMOVE':
      return state.filter((item) => item.id !== action.launch.id);
    default:
      return state;
  }
};

// This reducer stores some info on the request, i.e. next page, offset, etc.
export const requestInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case 'REQUEST_STARTED':
      return { ...state, loading: true };
    case 'LAUNCHES_LIST':
    case 'LAUNCHES_LIST_PAGE':
      return action.requestInfo;
    case 'REQUEST_FAILED':
      return { error: true };
    default:
      return state;
  }
};

// Here I name the action differently to my very own standard approach
// because this is a "global" event of sorts. There can only be one search
// therefore, no need to follow some sort of ideology and just name it
// based on what it does
export const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SEARCH':
      return action.query;
    default:
      return state;
  }
};
