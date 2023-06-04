import {FILTER} from '../const';

export const createFilter = (points) => Object.entries(FILTER).map(([filterName, filterPoints]) => ({
  name: filterName, count: filterPoints(points).length,
}),);
