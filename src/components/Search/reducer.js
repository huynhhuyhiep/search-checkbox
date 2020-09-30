const NEWS = {
  FETCHING: 'NEWS_FETCHING',
  SUCCESS: 'NEWS_FETCH_SUCCESS',
  FAIL: 'NEWS_FETCH_FAIL',
};

export const fetchNews = (query) => async (dispatch) => {
  dispatch({ type: NEWS.FETCHING });
  try {
    const response = await fetch(
      `https://hn.algolia.com/api/v1/search?query=${query}`
    );
    dispatch({
      type: NEWS.SUCCESS,
      payload: await response.json(),
      keyword: query,
    });
  } catch (error) {
    dispatch({ type: NEWS.FAIL, payload: error });
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
