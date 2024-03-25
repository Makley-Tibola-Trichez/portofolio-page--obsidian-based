import dirTree from 'directory-tree';
import { writeFileSync, } from 'fs';
import path from 'path';

const tree = dirTree(path.join('./src/pages'), {
  extensions: /\.mdx?$/,
  normalizePath: true
});


// recursively remove empty children
/**
 * 
 * @typedef {{
 * children?: MDXTree[]
 * name: string
 * path: string
 * }} MDXTree
 * @param {MDXTree} node 
 */
const removeEmpty = (node) => {

  node.name = node.name.replace('.mdx', '');
  node.path = node.path.replace('src/pages/', '').replace('.mdx', '');
  if (typeof node.children === 'undefined') {
    return;
  }

  if (node.children?.length === 0) {
    return;
  }

  node.children.forEach((i, idx) => {
    if (typeof node.children === 'undefined') {
      return;
    }
    if (i.children?.length === 0) {
      delete node.children[idx];


      return;
    }
    removeEmpty(i);
  });
};

removeEmpty(tree);


tree.children = tree.children.filter(tree => tree !== null);

const treeString = JSON.stringify(tree, null, 2);


writeFileSync(path.join('./src/data/mdx-tree.json'), treeString);
