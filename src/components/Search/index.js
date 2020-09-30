import React, { memo, useCallback } from 'react';
import SearchList from './SearchList';
import { useDispatch } from 'react-redux';
import { fetchNews } from './reducer';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const handleChange = useCallback(
    e => {
      dispatch(fetchNews(e.target.value));
    },
    [dispatch]
  );

  return (
    <>
      <div className="search-input-container flex-row align-center">
        <input
          onChange={handleChange}
          placeholder="Search…"
          className="search-input"
        />
      </div>
      <SearchList />
    </>
  );
};

export default memo(Search);
