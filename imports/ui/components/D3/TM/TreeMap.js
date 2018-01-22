import React from 'react';
import PropTypes from 'prop-types';
import rd3 from 'rd3';

const Tm = rd3.Treemap;

const TreeMap = ({ data, height, width }) => (
  <Tm
    width={width}
    height={height}
    title="Treemap"
    data={data}
  />
);

TreeMap.propTypes = {
  data: PropTypes.object.isRequired,
  valueUnit: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  colorUnit: PropTypes.string,
  lowColor: PropTypes.string,
  highColor: PropTypes.string,
};

TreeMap.defaultProps = {
  valueUnit: 'value',
  colorUnit: undefined,
  lowColor: undefined,
  highColor: undefined,
};

export default TreeMap;
