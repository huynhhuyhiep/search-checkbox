import React, { memo, useCallback, useState } from 'react';
import SearchList from './SearchList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from './reducer';
import './Search.css';
import { useDebounce } from '../../hook';

const Loader = memo(() => {
  const loading = useSelector(state => state.loading);
  if (!loading) return null;
  return <div className="loader" />;
});

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  useDebounce(() => dispatch(fetchNews(value)), 100, [value]);
  const handleChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  return (
    <>
      <div className="search-header flex-row align-center">
        <div className="search-input-container flex-row">
          <input
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
