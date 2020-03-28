import React from 'react';
import './index.less';

function BdpPageContent(props) {
  const { children } = props;
  return <div className="bdp-page-content">{children}</div>;
}
function BtnGourp(props) {
  const { children, maxWidth, center } = props;
  return (
    <div
      className={center ? 'bdp-btn-group center' : 'bdp-btn-group'}
      style={maxWidth ? { maxWidth } : {}}
    >
      {children}
    </div>
  );
}
function BdpContent(props) {
  const { children } = props;
  return <div className="bdp-content">{children}</div>;
}
function Panel(props) {
  const { children } = props;
  return <div className="bdp-panel">{children}</div>;
}
function PanelHeader(props) {
  const { title, children } = props;
  return (
    <div className="panel-heading">
      {title && <p>{title}</p>}
      {children}
    </div>
  );
}
function PanelBody(props) {
  const { children } = props;
  return <div className="panel-body">{children}</div>;
}
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
export { Panel, PanelBody, PanelHeader, formItemLayout, BdpContent, BdpPageContent, BtnGourp };
