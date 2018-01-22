import React from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';

const Legend = ((props) => {
  const textStyle = {
    color: 'black',
    fontSize: '50%',
    verticalAlign: 'top',
  };

  const legendItems = [];

  props.data.forEach((series, idx) => {
    const itemStyle = {
      color: props.colors(props.colorAccessor(series, idx)),
      lineHeight: '60%',
      fontSize: '200%',
    };

    legendItems.push(
      <li key={idx} className={props.itemClassName} style={itemStyle} >
        <span style={textStyle} > {series.name} </span>
      </li>
    );
  });

  const topMargin = props.margins.top;

  const legendBlockStyle = {
    wordWrap: 'break-word',
    width: props.width,
    paddingLeft: 0,
    marginBottom: 0,
    marginTop: topMargin,
    listStylePosition: 'inside',
  };

  return (
    <ul className={props.className} style={legendBlockStyle} >
      {legendItems}
    </ul>
  );
});

Legend.propTypes = {
  className: PropTypes.string,
  colors: PropTypes.func,
  colorAccessor: PropTypes.func,
  data: PropTypes.array.isRequired,
  itemClassName: PropTypes.string,
  margins: PropTypes.object,
  text: PropTypes.string,
  width: PropTypes.number.isRequired,
};

Legend.defaultProps = {
  className: 'rd3-legend',
  colors: d3.scale.category20c(),
  colorAccessor: (d, idx) => idx,
  itemClassName: 'rd3-legend-item',
  text: '#000',
};

export default Legend;
