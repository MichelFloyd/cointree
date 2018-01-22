import React from 'react';
import PropTypes, { string } from 'prop-types';
import d3 from 'd3';
import CellContainer from './CellContainer';

const DataSeries = ((props) => {
  const treemap = d3.layout.treemap()
    .sort((a,b) => a.value - b.value) // see https://stackoverflow.com/a/20720820/2805154
    .children(d => d) // make sure calculation loop through all objects inside array
    .size([props.width, props.height]) // see https://stackoverflow.com/a/20720820/2805154
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
      label={props.fontSize < 0.8 * node.dy && props.fontSize < node.dx/3 ? node.label : ''}
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
  fontSize: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
};

DataSeries.defaultProps = {
  data: [],
  colors: d3.scale.category20c(),
  colorAccessor: (d, idx) => idx,
  width: 100,
  height: 100,
  fontSize: '12',
};

export default DataSeries;
