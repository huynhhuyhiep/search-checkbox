import React, { memo, useCallback, useMemo, useState } from 'react';
import { CHECKBOX_STATUS } from './constant';
import CheckboxItem from './CheckboxItem';
import { v4 as uuidv4 } from 'uuid';

const NESTED_OBJECT = {
  name: 'level 1',
  items: [
    {
      name: 'level 1.1',
      items: [
        {
          name: 'level 1.1.1',
        },
        {
          name: 'level 1.1.2',
          items: [
            {
              name: 'level 1.2.1',
              items: [
                {
                  name: 'level 1.2.1.1',
                  items: [
                    {
                      name: 'level 1.2.1.1.1',
                    },
                    {
                      name: 'level 1.2.1.1.2',
                    },
                  ],
                },
                {
                  name: 'level 1.2.1.2',
                },
              ],
            },
          ],
        },
        {
          name: 'level 1.1.3',
          items: [
            {
              name: 'level 1.1.3.1',
            },
            {
              name: 'level 1.1.3.2',
            },
          ],
        },
      ],
    },
    {
      name: 'level 1.2',
      items: [
        {
          name: 'level 1.2.1',
        },
      ],
    },
  ],
};

const Checkbox = () => {
  // Obj contain all status of checkbox, accessed by key
  const [checkboxStatus, setCheckboxStatus] = useState({});
  const nestedObj = useMemo(() => {
    const setParent = (item) => {
      item.key = uuidv4();
      if (item.items) {
        item.items.forEach((el) => {
          el.parent = item;
          setParent(el);
        });
      }
    };

    setParent(NESTED_OBJECT);
    return NESTED_OBJECT;
  }, []);

  const handleToggle = useCallback((item) => {
    //prevent stale closures
    setCheckboxStatus((checkboxStatus) => {
      const { key, parent } = item;

      const nextStatus =
        checkboxStatus[key] === CHECKBOX_STATUS.CHECKED
          ? CHECKBOX_STATUS.UNCHECKED
          : CHECKBOX_STATUS.CHECKED;

      const updateChildrenStatus = (item, status) => {
        const { key, items } = item;
        checkboxStatus[key] = status;
        if (items) {
          items.forEach((el) => {
            updateChildrenStatus(el, status);
          });
        }
      };
      updateChildrenStatus(item, nextStatus);

      const updateParentStatus = (item) => {
        if (!item) return;

        const { items, parent, key } = item;
        const countCheckedChildren = items.reduce(
          (sum, el) =>
            (sum += checkboxStatus[el.key] === CHECKBOX_STATUS.CHECKED),
          0
        );
        const countPartialCheckedChildren = items.reduce(
          (sum, el) =>
            (sum += checkboxStatus[el.key] === CHECKBOX_STATUS.PARTIAL_CHECKED),
          0
        );

        let status;
        if (countCheckedChildren === items.length)
          status = CHECKBOX_STATUS.CHECKED;
        else if (countPartialCheckedChildren > 0 || countCheckedChildren > 0)
          status = CHECKBOX_STATUS.PARTIAL_CHECKED;
        else status = CHECKBOX_STATUS.UNCHECKED;

        checkboxStatus[key] = status;

        updateParentStatus(parent);
      };
      updateParentStatus(parent);

      return { ...checkboxStatus };
    });
  }, []);

  const renderCheckbox = (item) => {
    const { items, key } = item;
    return (
      <div key={key}>
        <CheckboxItem
          item={item}
          status={checkboxStatus[key]}
          onClick={handleToggle}
        />
        <div style={{ marginLeft: 20 }}>
          {items?.map((el) => renderCheckbox(el))}
        </div>
      </div>
    );
  };

  return renderCheckbox(nestedObj);
};

export default memo(Checkbox);
