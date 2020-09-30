import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const SearchList = ({ keyword }) => {
  const { data, loading, error } = useSelector((state) => state);

  const highlightKeyword = (title) => {
    if (!keyword) return { __html: title };
    return {
      __html: title?.replace(
        RegExp(keyword, 'gi'),
        (text) => `<em>${text}</em>` ?? title
      ),
    };
  };

  const renderLoading = () => {
    if (!loading || data.length > 0) return null;
    return <div className="news-loading">Loading...</div>;
  };

  const renderEmpty = () => {
    if (loading || data.length > 0) return null;
    return <div className="news-empty">Not Found</div>;
  };

  const renderError = () => {
    if (!error || loading) return null;
    return <div className="news-error">Has Error: {error}</div>;
  };

  // prevent show Not found when component init
  if (loading === null) return null;
  return (
    <div className="news-container">
      {renderLoading()}
      {data?.map((item) => {
        const { title, objectID, story_text } = item;
        return (
          <div key={objectID} className="news-item">
            <div
              className="news-item-title"
              dangerouslySetInnerHTML={highlightKeyword(title)}
            />
            <div
              className="news-item-content"
              dangerouslySetInnerHTML={highlightKeyword(story_text)}
            />
          </div>
        );
      })}
      {renderEmpty()}
      {renderError()}
    </div>
  );
};

export default memo(SearchList);
