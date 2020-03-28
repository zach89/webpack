import React from 'react';
import './index.less';
function StandardTitle(props) {
  const { children } = props;
  return <div className="bdp-standard-title">{children}</div>;
}
function LeftLable(props) {
  const { children } = props;
  return <div className="bdp-left-lable">{children}</div>;
}
function RightBtn(props) {
  const { children } = props;
  return <div className="bdp-right-btn">{children}</div>;
}

export { StandardTitle, LeftLable, RightBtn };
