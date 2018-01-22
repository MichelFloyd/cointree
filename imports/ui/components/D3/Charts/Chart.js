import React from 'react';
import PropTypes from 'prop-types';
import LegendChart from './LegendChart';
import BasicChart from './BasicChart';

class Chart extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.shouldUpdate;
  }

  render() {
    const { props } = this;

    if (props.legend) {
      return (
        <LegendChart
          svgClassName={props.svgClassName}
          titleClassName={props.titleClassName}
          {...this.props}
        />
      );
    }
    return (
      <BasicChart
        svgClassName={props.svgClassName}
        titleClassName={props.titleClassName}
        {...this.props}
      />
    );
  }
}

Chart.propTypes = {
  legend: PropTypes.bool,
  svgClassName: PropTypes.string,
  titleClassName: PropTypes.string,
  shouldUpdate: PropTypes.bool,
};

Chart.defaultProps = {
  legend: false,
  svgClassName: 'rd3-chart',
  titleClassName: 'rd3-chart-title',
  shouldUpdate: true,
};

export default Chart;
