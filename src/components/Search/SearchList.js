import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const SearchList = () => {
  const { data, loading, error } = useSelector((state) => state);

  const renderLoading = () => {
    if (!loading || data.length > 0) return null;
    return <div className="news-loading">Loading...</div>;
  };

  const renderEmpty = () => {
    if (loading || error || data.length > 0) return null;
    return <div className="news-empty">Not Found</div>;
  };

  const renderError = () => {
    if (!error || loading) return null;
    return <div className="news-error">{error}</div>;
  };

  // prevent show Not found when component init
  if (loading === null) return null;
  return (
    <div className="news-container">
      {renderLoading()}
      {data?.map((item) => {
        const { _highlightResult, objectID } = item;
        const { title, story_text } = _highlightResult || {};
        return (
          <div key={objectID} className="news-item">
            {title && (
              <div
                className="news-item-title"
                dangerouslySetInnerHTML={{ __html: title.value }}
              />
            )}
            {story_text && (
              <div
                className="news-item-content"
                dangerouslySetInnerHTML={{ __html: story_text.value }}
              />
            )}
          </div>
        );
      })}
      {renderEmpty()}
      {renderError()}
    </div>
  );
};

export default memo(SearchList);
