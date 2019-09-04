import React from "react";
import OpenedSvg from '../images/opened';
import ClosedSvg from '../images/closed';
import config from '../../../config';
import Link from "../link";

const TreeNode = ({className = '', setCollapsed, collapsed, url, title, items, level, ...rest}) => {
  const isCollapsed = collapsed[url];
  const collapse = () => {
    setCollapsed(url);
  }
  const hasChildren = items.length !== 0;
  const location = window.location;
  const pathname = location.pathname.replace(/\/$/, '');
  const active = pathname === url || pathname === (config.gatsby.pathPrefix + url);
  const calculatedClassName = `${className} item ${active ? 'active' : ''}`;
  const childrenLevel = level + 1;
  return (
    <li
      className={calculatedClassName}
    >
      {!config.sidebar.frontLine && title && hasChildren ? (
        <button
          onClick={collapse}
          className='collapser'>
          {!isCollapsed ? <OpenedSvg /> : <ClosedSvg />}
        </button>
      ) : null}

      {title && !hasChildren ? (
        <Link
          to={url}
        >
          {title}
        </Link>
      ) : (
        level > 0 ? <a onClick={collapse}>{title}</a> : null
      )}

      {!isCollapsed && hasChildren ? (
        <ul data-level={childrenLevel}>
          {items.map((item, idx) => (
            <TreeNode
              key={item.url || idx}
              setCollapsed={setCollapsed}
              collapsed={collapsed}
              level={childrenLevel}
              {...item}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
export default TreeNode
