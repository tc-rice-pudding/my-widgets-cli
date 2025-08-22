import { reactive } from "vue";
interface Tree {
  id: number;
  label: string;
  children?: Tree[];
  visible?: boolean;
}

export let dataSource = reactive<Tree[]>([
  {
    id: 1,
    label: "Level one 1",
    children: [
      {
        id: 4,
        label: "Level two 1-1",
        children: [
          {
            id: 9,
            label: "Level three 1-1-1",
          },
          {
            id: 10,
            label: "Level three 1-1-2",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Level one 2",
    children: [
      {
        id: 5,
        label: "Level two 2-1",
      },
      {
        id: 6,
        label: "Level two 2-2",
        children: [
          {
            id: 51,
            label: "Level two 2-1",
          },
          {
            id: 62,
            label: "Level two 2-2",
            children: [
              {
                id: 15,
                label: "Level two 2-1",
                children: [
                  {
                    id: 152,
                    label: "Level two 2-1",
                    children: [
                      {
                        id: 135,
                        label: "Level two 2-1",
                        children: [
                          {
                            id: 165,
                            label: "Level two 2-1",
                            children: [
                              {
                                id: 135,
                                label: "Level two 2-1",
                                children: [
                                  {
                                    id: 1509,
                                    label: "Level two 2-1",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Level one 3",
    children: [
      {
        id: 7,
        label: "Level two 3-1",
      },
      {
        id: 8,
        label: "Level two 3-2",
      },
    ],
  },
]);
