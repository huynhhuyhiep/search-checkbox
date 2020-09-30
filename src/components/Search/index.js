import React, { memo, useCallback, useState } from 'react';
import SearchList from './SearchList';
import { useDispatch } from 'react-redux';
import { fetchNews } from './reducer';
import './Search.css';
import { useDebounce } from '../../hook';

const Search = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  useDebounce(() => dispatch(fetchNews(keyword)), 200, [keyword]);

  const handleChange = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);

  return (
    <>
      <div className="search-input-container flex-row align-center">
        <input
          onChange={handleChange}
          placeholder="Search…"
          className="search-input"
        />
      </div>
      <SearchList keyword={keyword} />
    </>
  );
};

export default memo(Search);
