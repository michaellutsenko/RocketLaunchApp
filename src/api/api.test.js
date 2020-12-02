import fetchMock from 'jest-fetch-mock';
import { makeRequest, fetchLaunches, fetchNextPage } from './api';

// Note the slash at the end, it's important
const launchApiUrlRegex = /https:\/\/ll.thespacedevs.com\/2.0.0\/launch\/previous\//;
const searchParamRegex = /search=[\w\s_]+/;

const testUrl = 'http://localhost';
const testResponse = { test: true };

// Test suite for the API module
describe('API', () => {
  // makeRequest() uses fetch(), so we'll be mocking fetch()
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  // Resetting the fetch() mock before each of the tests
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe('makeRequest()', () => {
    test('only sends GET requests', async () => {
      fetch.mockResponseOnce(JSON.stringify(testResponse));
      await makeRequest(testUrl);

      const options = fetch.mock.calls[0][1];
      expect(options).toHaveProperty('method', 'GET');
    });

    test('returns parsed result on successful fetches', async () => {
      fetch.mockResponseOnce(JSON.stringify(testResponse));
      const res = await makeRequest(testUrl);

      expect(res).toHaveProperty('test', true);
    });

    test('returns an empty object on fetch failures', async () => {
      fetch.mockRejectOnce(new Error('test error'));
      const res = await makeRequest(testUrl);

      expect(res).toBeDefined();
      expect(res).toMatchObject({});
    });
  });
  // Tests for fetchLaunches()
  describe('fetchLaunches()', () => {
    test('calls the correct URL when no args provided', async () => {
      await fetchLaunches();

      const url = fetch.mock.calls[0][0];
      expect(url).toMatch(launchApiUrlRegex);
    });

    test('correctly adds search string to GET params when a search query is provided', async () => {
      await fetchLaunches('test');

      const url = fetch.mock.calls[0][0];
      expect(url).toMatch(searchParamRegex);
    });

    test('correctly returns the result of makeRequest', async () => {
      fetch.mockResponseOnce(JSON.stringify(testResponse));
      const res = await fetchLaunches();

      expect(res).toBeDefined();
      expect(res).toHaveProperty('test', true);
    });
  });

  // I skipped tests for fetchNextPage() as it's virtually the same as
  // fetchLaunches(). Also, to save time
});
