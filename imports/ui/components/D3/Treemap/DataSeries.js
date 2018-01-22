import React from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';
import CellContainer from './CellContainer';

const DataSeries = ((props) => {
  const treemap = d3.layout.treemap()
    .children(d => d) // make sure calculation loop through all objects inside array
    .size([props.width, props.height])
    .sticky(true)
    .value(d => d.value);

  const tree = treemap(props.data);

  const cells = tree.map((node, idx) => (
    <CellContainer
      key={idx}
      x={node.x}
      y={node.y}
      width={node.dx}
      height={node.dy}
      fill={props.colors(props.colorAccessor(node, idx))}
      label={node.label}
      fontSize={props.fontSize}
      textColor={props.textColor}
      hoverAnimation={props.hoverAnimation}
    />
  ), this);

  return (
    <g transform={props.transform} className="treemap">
      {cells}
    </g>
  );
});

DataSeries.propTypes = {
  data: PropTypes.array,
  colors: PropTypes.func,
  colorAccessor: PropTypes.func,
  width: PropTypes.number,
  height: PropTypes.number,
};

DataSeries.defaultProps = {
  data: [],
  colors: d3.scale.category20c(),
  colorAccessor: (d, idx) => idx,
};

export default DataSeries;
