// utility functions for d3 charts
import d3 from 'd3';

const calculateScales = (
  width,
  height,
  xValues,
  yValues,
  xDomain = [],
  yDomain = []
) => {
  const xScale =
    xValues.length > 0 &&
    Object.prototype.toString.call(xValues[0]) === '[object Date]'
      ? d3.time.scale().range([0, width])
      : d3.scale.linear().range([0, width]);

  const xdomain = d3.extent(xValues);
  if (xDomain[0] !== undefined && xDomain[0] !== null) xdomain[0] = xDomain[0];
  if (xDomain[1] !== undefined && xDomain[1] !== null) xdomain[1] = xDomain[1];
  xScale.domain(xdomain);

  const yScale =
    yValues.length > 0 &&
    Object.prototype.toString.call(yValues[0]) === '[object Date]'
      ? d3.time.scale().range([height, 0])
      : d3.scale.linear().range([height, 0]);

  const ydomain = d3.extent(yValues);
  if (yDomain[0] !== undefined && yDomain[0] !== null) ydomain[0] = yDomain[0];
  if (yDomain[1] !== undefined && yDomain[1] !== null) ydomain[1] = yDomain[1];
  yScale.domain(ydomain);

  return {
    xScale,
    yScale,
  };
};

// debounce from Underscore.js
// MIT License: https://raw.githubusercontent.com/jashkenas/underscore/master/LICENSE
// Copyright (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative
// Reporters & Editors
const debounce = (func, wait, immediate) => {
  let timeout;
  return (...args) => {
    const context = this;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

const flattenData = (data, xAccessor, yAccessor) => {
  const allValues = [];
  const xValues = [];
  const yValues = [];
  const coincidentCoordinateCheck = {};

  data.forEach((series, i) => {
    series.values.forEach((item, j) => {
      const x = xAccessor(item);

      // Check for NaN since d3's Voronoi cannot handle NaN values
      // Go ahead and Proceed to next iteration since we don't want NaN
      // in allValues or in xValues or yValues
      if (isNaN(x)) return;
      xValues.push(x);

      const y = yAccessor(item);
      // when yAccessor returns an object (as in the case of candlestick)
      // iterate over the keys and push all the values to yValues array
      let yNode;
      if (typeof y === 'object' && Object.keys(y).length > 0) {
        Object.keys(y).forEach((key) => {
          // Check for NaN since d3's Voronoi cannot handle NaN values
          // Go ahead and Proceed to next iteration since we don't want NaN
          // in allValues or in xValues or yValues
          if (isNaN(y[key])) return;
          yValues.push(y[key]);
          // if multiple y points are to be plotted for a single x
          // as in the case of candlestick, default to y value of 0
          yNode = 0;
        });
      } else {
        // Check for NaN since d3's Voronoi cannot handle NaN values
        // Go ahead and Proceed to next iteration since we don't want NaN
        // in allValues or in xValues or yValues
        if (isNaN(y)) return;
        yValues.push(y);
        yNode = y;
      }

      const xyCoords = `${x}-${yNode}`;
      if (coincidentCoordinateCheck.hasOwnProperty(xyCoords)) return;
      /* Proceed to next iteration if the x y pair already exists
       * d3's Voronoi cannot handle NaN values or coincident coords
       * But we push them into xValues and yValues above because
       * we still may handle them there (labels, etc.)
       */

      coincidentCoordinateCheck[xyCoords] = '';

      const pointItem = {
        coord: { x, y: yNode },
        d: item,
        id: series.name + j,
        series,
        seriesIndex: i,
      };
      allValues.push(pointItem);
    });
  });

  return { allValues, xValues, yValues };
};

const shade = (hex, percent) => {
  const { min, round } = Math;
  if (hex.length !== 7) return hex;
  const number = parseInt(hex.slice(1), 16);
  const R = number >> 16;
  const G = (number >> 8) & 0xff;
  const B = number & 0xff;
  let red = min(255, round((1 + percent) * R)).toString(16);
  if (red.length === 1) red = `0${red}`;
  let green = min(255, round((1 + percent) * G)).toString(16);
  if (green.length === 1) green = `0${green}`;
  let blue = min(255, round((1 + percent) * B)).toString(16);
  if (blue.length === 1) blue = `0${blue}`;
  return `#${red}${green}${blue}`;
};

export { calculateScales, debounce, flattenData, shade };
