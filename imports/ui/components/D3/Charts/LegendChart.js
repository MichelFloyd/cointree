import React from 'react';
import PropTypes from 'prop-types';
import d3 from 'd3';
import Legend from './Legend';

class LegendChart extends React.Component {
  _renderLegend() {
    const { props } = this;
    if (props.legend) {
      return (
        <Legend
          colors={props.colors}
          colorAccessor={props.colorAccessor}
          data={props.data}
          legendPosition={props.legendPosition}
          margins={props.margins}
          width={props.sideOffset}
        />
      );
    }
    return null;
  }

  _renderTitle() {
    const { props } = this;
    return props.title ? <h4 className={props.titleClassName}>{props.title}</h4> : null;
  }

  _renderChart() {
    const { props } = this;
    return (
      <svg className={props.svgClassName} height="100%" viewBox={props.viewBox} width="100%">
        {props.children}
      </svg>
    );
  }

  render() {
    const { props } = this;

    return (
      <div className={props.className} style={{ width: props.width, height: props.height }}>
        {this._renderTitle()}
        <div style={{ display: 'table', width: '100%', height: '100%' }}>
          <div style={{ display: 'table-cell', width: '100%', height: '100%' }}>
            {this._renderChart()}
          </div>
          <div style={{ display: 'table-cell', width: props.sideOffset, verticalAlign: 'top' }}>
            {this._renderLegend()}
          </div>
        </div>
      </div>
    );
  }
}

LegendChart.propTypes = {
  children: PropTypes.node,
  createClass: PropTypes.string,
  colors: PropTypes.func,
  colorAccessor: PropTypes.func,
  data: PropTypes.array,
  height: PropTypes.node,
  legend: PropTypes.bool,
  legendPosition: PropTypes.string,
  margins: PropTypes.object,
  sideOffset: PropTypes.number,
  svgClassName: PropTypes.string,
  title: PropTypes.node,
  titleClassName: PropTypes.string,
  viewBox: PropTypes.string,
  width: PropTypes.node,
};

LegendChart.defaultProps = {
  className: 'rd3-legend-chart',
  colors: d3.scale.category20c(),
  colorAccessor: (d, idx) => idx,
  data: [],
  legend: false,
  legendPosition: 'right',
  sideOffset: 90,
  svgClassName: 'rd3-chart',
  titleClassName: 'rd3-chart-title',
  title: '',
};

export default LegendChart;
