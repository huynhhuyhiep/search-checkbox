import { CHECKBOX_STATUS } from './constant';
import React, { memo, useLayoutEffect, useRef } from 'react';

const CheckboxItem = ({ status, onClick, item }) => {
  const checkboxRef = useRef();

  useLayoutEffect(() => {
    // Currently, React not support an indeterminate prop for checkbox inputs,
    // so I workaround by set indeterminate property via DomNode
    checkboxRef.current.indeterminate =
      status === CHECKBOX_STATUS.PARTIAL_CHECKED;
  }, [status]);

  return (
    <div>
      <input
        type="checkbox"
        checked={status === CHECKBOX_STATUS.CHECKED}
        ref={checkboxRef}
        onChange={() => onClick(item)}
      />
      <span>{item.name}</span>
    </div>
  );
};

export default memo(CheckboxItem);
