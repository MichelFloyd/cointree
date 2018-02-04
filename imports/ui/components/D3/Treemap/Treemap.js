import React from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';
import Chart from '../Charts/Chart';
import DataSeries from './DataSeries';

const Treemap = (props) => {
  const { data, title, height, width, ...other } = props;
  return data && data.length < 1 ? null : (
    <Chart title={title} width={width} height={height}>
      <g className="rd3-treemap">
        <DataSeries
          data={data}
          width={width}
          height={height}
          {...other}
        />
      </g>
    </Chart>
  );
};

Treemap.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  textColor: PropTypes.string,
};

Treemap.defaultProps = {
  data: [],
  title: '',
  width: 400,
  height: 200,
  textColor: '#f7f7f7',
};

export default Treemap;
