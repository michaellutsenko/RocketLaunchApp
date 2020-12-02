import * as actions from './actions';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as api from '../api/api';

const mockStore = configureMockStore([thunk.withExtraArgument(api)]);

jest.mock('../api/api');

describe('redux store actions', () => {
  describe('getLaunches()', () => {
    test('dispatches REQUEST_STARTED and LAUNCHES_LIST with correct response', async () => {
      api.fetchLaunches.mockResolvedValueOnce({
        results: [0, 1, 2],
        next: 'test',
      });
      const store = mockStore({ launches: [], requestInfo: {} });

      await store.dispatch(actions.getLaunches());

      const expectedActions = [
        { type: 'REQUEST_STARTED' },
        {
          type: 'LAUNCHES_LIST',
          launches: [0, 1, 2],
          requestInfo: { next: 'test', loading: false },
        },
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });

    // Here I'm counting on the fact that fetchLaunches will never be rejected
    // and in case of an error it will resolve with an empty object
    test('dispatches REQUEST_FAILED whenever an empty response is returned', async () => {
      api.fetchLaunches.mockResolvedValueOnce({});
      const store = mockStore({ launches: [], requestInfo: {} });

      await store.dispatch(actions.getLaunches());

      const expectedActions = [
        { type: 'REQUEST_STARTED' },
        { type: 'REQUEST_FAILED' },
      ];

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
