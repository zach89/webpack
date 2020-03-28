import React from 'react';

const BdpIcon = ({ type, color, className = '', size = 'md', ...restProps }) => (
  <svg
    className={`bdpicon bdpicon-${size} ${className}`}
    aria-hidden="true"
    {...restProps}
    style={{ fill: color }}
  >
    <use xlinkHref={`#${type}`} />
  </svg>
);

export default BdpIcon;
