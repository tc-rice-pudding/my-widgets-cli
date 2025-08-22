export interface Tree {
  id: number;
  label: string;
  children?: Tree[];
  visible?: boolean;
}

// const append = (data: Tree) => {
//   const newChild = { id: id++, label: "testtest", children: [] };
//   if (!data.children) {
//     data.children = [];
//   }
//   data.children.push(newChild);
// };

// const remove = (node: Node, data: Tree) => {
//   const parent = node.parent;
//   const children: Tree[] = parent.data.children || parent.data;
//   const index = children.findIndex((d) => d.id === data.id);
//   children.splice(index, 1);
// };

export function getViewHeight() {
  let winHeight = 0;
  if (window.innerHeight) {
    winHeight = window.innerHeight;
  } else if (document.body && document.body.clientHeight) {
    winHeight = document.body.clientHeight;
  } else if (
    document.documentElement &&
    document.documentElement.clientHeight
  ) {
    winHeight = document.documentElement.clientHeight;
  }
  return winHeight;
}
