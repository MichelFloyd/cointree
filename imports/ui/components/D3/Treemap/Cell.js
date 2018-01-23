import React from 'react';
import PropTypes from 'prop-types';

const Cell = ((props) => {
  const textStyle = {
    textAnchor: 'middle',
    fill: props.textColor,
    fontSize: props.fontSize,
  };

  const t = `translate(${props.x},${props.y})`;

  return (
    <g transform={t}>
      <rect
        className="rd3-treemap-cell"
        width={props.width}
        height={props.height}
        fill={props.fill}
        onMouseOver={props.handleMouseOver}
        onMouseLeave={props.handleMouseLeave}
      />
      <text
        x={props.width / 2}
        y={props.height / 2}
        dy=".35em"
        style={textStyle}
        className="rd3-treemap-cell-text"
      >
        {props.label}
      </text>
    </g>
  );
});

Cell.propTypes = {
  fill: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  label: PropTypes.string,
};

export default Cell;
