export const CHECKBOX_STATUS = {
  CHECKED: 1,
  UNCHECKED: 0,
  PARTIAL_CHECKED: -1,
};

export const NESTED_OBJECT = {
  name: 'level 1',
  items: [
    {
      name: ' level 2',
      items: [
        {
          name: 'level 3',
        },
        {
          name: 'level 3',
          items: [
            {
              name: 'level 4',
              items: [
                {
                  name: 'level 5',
                  items: [
                    {
                      name: 'level 6',
                    },
                    {
                      name: 'level 6',
                    },
                  ],
                },
                {
                  name: 'level 5',
                },
              ],
            },
          ],
        },
        {
          name: 'level 3',
          items: [
            {
              name: 'level 4',
            },
            {
              name: 'level 4',
            },
          ],
        },
      ],
    },
    {
      name: 'level 2',
      items: [
        {
          name: 'level 3',
        },
      ],
    },
  ],
};
