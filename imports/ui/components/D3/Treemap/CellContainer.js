import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';
import { shade } from '../utils';

class CellContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fill: this.props.fill };
    // fill is named as fill instead of initialFill to avoid
    // confusion when passing down props from top parent

    this._animateCell = this._animateCell.bind(this);
    this._restoreCell = this._restoreCell.bind(this);
  }

  _animateCell() {
    this.setState({ fill: shade(this.props.fill, 0.05) });
  }

  _restoreCell() {
    this.setState({ fill: this.props.fill });
  }

  render() {
    const { props } = this;

    return (
      <Cell
        {...props}
        fill={this.props.fill}
        handleMouseOver={props.hoverAnimation ? this._animateCell : null}
        handleMouseLeave={props.hoverAnimation ? this._restoreCell : null}
      />
    );
  }
}

CellContainer.propTypes = {
  fill: PropTypes.string.isRequired,
};

export default CellContainer;
