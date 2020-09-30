import axios from 'axios';

const NEWS = {
  FETCHING: 'NEWS_FETCHING',
  SUCCESS: 'NEWS_FETCH_SUCCESS',
  FAIL: 'NEWS_FETCH_FAIL',
};

export const fetchNews = (query) => async (dispatch) => {
  dispatch({ type: NEWS.FETCHING });
  try {
    const { data } = await axios({
      url: `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(
        query
      )}`,
    });

    console.log('response', data);
    dispatch({
      type: NEWS.SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEWS.FAIL,
      payload: 'Sorry, something went wrong, please try again!',
    });
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
      // remove items dont have title and story_text
      const data = action.payload?.hits?.filter(
        (item) => item.title || item.story_text
      );
      return { loading: false, data, error: null, keyword: action.keyword };
    case NEWS.FAIL:
      return { loading: false, error: action.payload, data: [] };
    default:
      return state;
  }
};

export default reducer;
