import React from 'react';
import { GetCompRange } from '../graphql/types';
import { PercentileBarChart } from './PercentileBarChart';

const useFullTimeChartData = ({ getRestaurantCompRanges }: GetCompRange) => {
  const hookfishRange = getRestaurantCompRanges[0].employmentTypeRange[1].range;
  const gamineRange = getRestaurantCompRanges[1].employmentTypeRange[1].range;

  const chartData = ['p10', 'p25', 'p50', 'p75', 'p90'].map((key: string) => ({
    name: key,
    gamine: gamineRange[key],
    hookfish: hookfishRange[key],
  }));

  return { chartData };
};

export const FullTimeChart = ({ data }: { data: GetCompRange }) => {
  const { chartData } = useFullTimeChartData(data);
  return (
    <PercentileBarChart
      title="Full Time Total Compensation Percentiles"
      chartData={chartData}
    />
  );
};
