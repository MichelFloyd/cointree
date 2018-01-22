import React from 'react';
import PropTypes from 'prop-types';

class BasicChart extends React.Component {
  _renderTitle() {
    const { props } = this;
    return props.title ? <h4 className={props.titleClassName}>{props.title}</h4> : null;
  }

  _renderChart() {
    const { props } = this;
    return (
      <svg
        className={props.svgClassName}
        height={props.height}
        viewBox={props.viewBox} // TBD viewbox is not defined anywhere
        width={props.width}
      >
        {props.children}
      </svg>
    );
  }

  render() {
    const { props } = this;
    return (
      <div
        className={props.className}
      >
        {this._renderTitle()}
        {this._renderChart()}
      </div>
    );
  }
}

BasicChart.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  svgClassName: PropTypes.string,
  title: PropTypes.node,
  titleClassName: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

BasicChart.defaultProps = {
  className: 'rd3-basic-chart',
  svgClassName: 'rd3-chart',
  titleClassName: 'rd3-chart-title',
  title: '',
};

export default BasicChart;
