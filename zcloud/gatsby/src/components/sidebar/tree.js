import React, {useState} from 'react';
import config from '../../../config';
import TreeNode from './treeNode';

const calculateTreeData = edges => {
  const originalData = config.sidebar.ignoreIndex ? edges.filter(({node: {fields: {slug}}}) => slug !== '/') : edges;
  const tree = originalData.reduce((accu, {node: {fields: {slug, title}}}) => {
    const parts = slug.split('/');
    let {items: prevItems} = accu;
    for (const part of parts.slice(1, -1)) {
      let tmp = prevItems.find(({label}) => label == part);
      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = {label: part, items: []};
        prevItems.push(tmp)
      }
      prevItems = tmp.items;
    }
    const existingItem = prevItems.find(({label}) => label === parts[parts.length - 1]);
    if (existingItem) {
      existingItem.url = slug;
      existingItem.title = title;
    } else {
      prevItems.push({
        label: parts[parts.length - 1],
        url: slug,
        items: [],
        title
      });
    }
    return accu;
  }, {items: []});
  const {sidebar: {navOrder = []}} = config;
  const tmp = [...navOrder];
  tmp.reverse();
  return tmp.reduce((accu, slug) => {
    let name = slug;
    let children = [];
    if (Array.isArray(slug)) {
      name = slug[0];
      children = slug.slice(1);
    }
    let {items: prevItems} = accu;

    {
      let tmp = prevItems.find(({label}) => label == name);
      if (tmp) {
        if (!tmp.items) {
          tmp.items = [];
        }
      } else {
        tmp = {label: name, items: []};
        prevItems.push(tmp)
      }
      // prevItems = tmp.items;
    }
    // sort items alphabetically.
    prevItems.map((item) => {
      if (item.label == name) {
        item.items = item.items
          .sort(function (a, b) {
            if (children.length > 0) {
              const idx = (l) => children.indexOf(l);
              if (idx(a.label) > idx(b.label)) {
                return 1;
              }
              if (idx(a.label) < idx(b.label)) {
                return -1;
              }
              return 0;
            } else {
              if (a.label < b.label)
                return -1;
              if (a.label > b.label)
                return 1;
              return 0;
            }
          });
      }
    })


    const index = prevItems.findIndex(({label}) => label === name);
    accu.items.unshift(prevItems.splice(index, 1)[0]);
    return accu;
  }, tree);
}


const Tree = ({edges}) => {
  const [treeData] = useState(() => {
    return calculateTreeData(edges);
  });
  const [collapsed, setCollapsed] = useState({});
  const toggle = (url) => {
    setCollapsed({
      ...collapsed,
      [url]: !collapsed[url],
    });
  }
  return (
    <TreeNode
      className={`${config.sidebar.frontLine ? 'showFrontLine' : 'hideFrontLine'} firstLevel`}
      setCollapsed={toggle}
      collapsed={collapsed}
      level={0}
      {...treeData}
    />
  );
}

export default Tree
