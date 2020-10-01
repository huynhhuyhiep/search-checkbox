import React, { memo, useCallback, useState } from 'react';
import SearchList from './SearchList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from './reducer';
import './Search.css';
import { useDebounce } from '../../hook';

const SearchIcon = memo(() => {
  return (
    <span className="search-icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </span>
  );
});

const Loader = memo(() => {
  const loading = useSelector((state) => state.loading);
  if (!loading) return null;
  return <div className="search-loader" />;
});

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  useDebounce(() => dispatch(fetchNews(value)), 100, [value]);
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <>
      <div className="search-header flex-row flex-center">
        <div className="search-input-container flex-row">
          <SearchIcon />
          <input
            autoFocus
            onChange={handleChange}
            placeholder="Search…"
            className="search-input"
          />
          <Loader />
        </div>
      </div>
      <SearchList />
    </>
  );
};

export default memo(Search);
