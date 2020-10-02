import axios from 'axios';

const NEWS = {
  FETCHING: 'NEWS_FETCHING',
  SUCCESS: 'NEWS_FETCH_SUCCESS',
  FAIL: 'NEWS_FETCH_FAIL',
};

let cancelToken;
const CANCEL_MESSAGE = 'Cancel fetchNews request';

export const fetchNews = (query) => async (dispatch) => {
  dispatch({ type: NEWS.FETCHING });
  try {
    if (cancelToken) cancelToken.cancel(CANCEL_MESSAGE);
    cancelToken = axios.CancelToken.source();
    const { data } = await axios({
      url: `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
        query,
      )}`,
      cancelToken: cancelToken.token,
    });

    dispatch({
      type: NEWS.SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error?.message !== CANCEL_MESSAGE) {
      dispatch({
        type: NEWS.FAIL,
        payload: 'Sorry, something went wrong, please try again!',
      });
    }
  }
};

const initialState = {
  data: [],
  loading: null,
  error: null,
  keyword: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case NEWS.FETCHING:
      return { ...state, loading: true };
    case NEWS.SUCCESS:
      // remove items dont have title
      const data = action.payload.hits?.filter((item) => item.title) ?? [];
      return { loading: false, data, error: null, keyword: action.keyword };
    case NEWS.FAIL:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
