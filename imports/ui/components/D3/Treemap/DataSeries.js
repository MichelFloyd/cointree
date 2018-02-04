import React from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';
import Cell from './Cell';

const DataSeries = ({ data, width, height, colors, colorAccessor, ...other }) => {
  const treemap = d3.layout.treemap()
    .sort((a, b) => a.value - b.value) // see https://stackoverflow.com/a/20720820/2805154
    .children(d => d) // make sure calculation loop through all objects inside array
    .size([width, height]) // see https://stackoverflow.com/a/20720820/2805154
    .sticky(true)
    .value(d => d.value);

  const tree = treemap(data);

  const cells = tree.map((node, idx) => {
    const color = colors(colorAccessor(node, idx));
    return (
      <Cell
        key={idx}
        x={node.x}
        y={node.y}
        width={node.dx}
        height={node.dy}
        fill={color}
        label={node.label}
        {...other}
      />
    );
  }, this);

  return (
    <g className="treemap">
      {cells}
    </g>
  );
};

DataSeries.propTypes = {
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  colors: PropTypes.func,
  colorAccessor: PropTypes.func,
};

DataSeries.defaultProps = {
  data: [],
  width: 100,
  height: 100,
  colors: d3.scale.category20c(),
  colorAccessor: (d, idx) => idx,
};

export default DataSeries;
