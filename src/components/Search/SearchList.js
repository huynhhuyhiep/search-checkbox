import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const SearchList = () => {
  const { data, loading, error } = useSelector((state) => state);

  const renderEmpty = () => {
    if (loading || error || data.length > 0) return null;
    return <div className="news-empty flex-center">Not Found</div>;
  };

  const renderError = () => {
    if (!error || loading) return null;
    return <div className="news-error flex-center">{error}</div>;
  };

  // prevent show Not found when mounting component
  if (loading === null) return null;
  return (
    <div className="news-container">
      {data?.map((item) => {
        const { _highlightResult, objectID, url, _tags } = item;
        const { title, story_text, url: urlHighlight } = _highlightResult || {};
        return (
          <div key={objectID} className="news-item">
            {title && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {urlHighlight && (
                  <div
                    className="news-item-url"
                    dangerouslySetInnerHTML={{ __html: urlHighlight.value }}
                  />
                )}
                <div
                  className="news-item-title"
                  dangerouslySetInnerHTML={{ __html: title.value }}
                />
              </a>
            )}
            {_tags?.length > 0 && (
              <div className="flex-row">
                {_tags.map((item, index) => (
                  <div className="news-item-tag flex-center" key={index}>
                    {item}
                  </div>
                ))}
              </div>
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
