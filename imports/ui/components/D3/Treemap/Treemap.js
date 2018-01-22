import React from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';
import Chart from '../Charts/Chart';
import DataSeries from './DataSeries';

const Treemap = (props) => {
  return props.data && props.data.length < 1 ? null : (
    <Chart title={props.title} width={props.width} height={props.height}>
      <g className="rd3-treemap">
        <DataSeries
          data={props.data}
          width={props.width}
          height={props.height}
          colors={props.colors}
          colorAccessor={props.colorAccessor}
          textColor={props.textColor}
          fontSize={props.fontSize}
          hoverAnimation={props.hoverAnimation}
        />
      </g>
    </Chart>
  );
};

Treemap.propTypes = {
  data: PropTypes.array,
  margins: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  textColor: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.func,
  colorAccessor: PropTypes.func,
  hoverAnimation: PropTypes.bool,
};

Treemap.defaultProps = {
  hoverAnimation: true,
  data: [],
  width: 400,
  height: 200,
  margins: {
    left: 0, right: 0, top: 0, bottom: 0,
  },
  title: '',
  textColor: '#f7f7f7',
  fontSize: '0.85em',
  colors: d3.scale.category20c(),
  colorAccessor: (d, idx) => idx,
};

export default Treemap;
