import React from 'react';
import PropTypes from 'prop-types';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        stroke: props.textColor,
        strokeWidth: '1px',
      },
    };

    this.highlight = this.highlight.bind(this);
    this.unHighlight = this.unHighlight.bind(this);
  }

  highlight() {
    this.setState({
      style: {
        stroke: 'white',
        strokeWidth: '3px',
      },
    });
    this.props.hoverCb(this.props.label);
  }

  unHighlight() {
    this.setState({
      style: {
        stroke: this.props.textColor,
        strokeWidth: '1px',
      },
    });
    this.props.hoverCb(null);
  }

  render() {
    const { props } = this;
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
          style={this.state.style}
          fill={props.fill}
          onMouseOver={this.highlight}
          onMouseLeave={this.unHighlight}
        />

        { props.fontSize < 0.9 * props.height && props.label &&
          props.fontSize * props.label.length < 0.9 * props.width ?
            <text
              x={props.width / 2}
              y={props.height / 2}
              dy=".35em"
              style={textStyle}
              className="rd3-treemap-cell-text"
            >
              {props.label}
            </text>
          : ''
        }
      </g>
    );
  }
}

Cell.propTypes = {
  fill: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  label: PropTypes.string,
};

export default Cell;
