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
    const { width, height, fill, label, fontSize, x, y } = this.props;
    const textStyle = {
      textAnchor: 'middle',
      fill: this.state.style.stroke,
      fontSize: fontSize,
    };
    const t = `translate(${x},${y})`;

    return (
      <g transform={t}>
        <rect
          className="rd3-treemap-cell"
          width={width}
          height={height}
          style={this.state.style}
          fill={fill}
          onMouseOver={this.highlight}
          onMouseLeave={this.unHighlight}
          onFocus={this.highlight}
        />

        { fontSize < 0.9 * height && label && fontSize * label.length < 0.9 * width ?
          <text
            x={width / 2}
            y={height / 2}
            dy=".35em"
            style={textStyle}
            className="rd3-treemap-cell-text"
            onMouseOver={this.highlight}
            onMouseLeave={this.unHighlight}
            onFocus={this.highlight}
          >
            {label}
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
  hoverCb: PropTypes.func.isRequired,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

Cell.defaultProps = {
  label: '',
};

export default Cell;
