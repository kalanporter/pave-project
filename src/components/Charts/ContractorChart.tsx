import React from 'react';
import { GetCompRange } from '../graphql/types';
import { PercentileBarChart } from './PercentileBarChart';

const useContractorChartData = ({ getRestaurantCompRanges }: GetCompRange) => {
  const hookfishRange = getRestaurantCompRanges[0].employmentTypeRange[0].range;
  const gamineRange = getRestaurantCompRanges[1].employmentTypeRange[0].range;

  const chartData = ['p10', 'p25', 'p50', 'p75', 'p90'].map((key: string) => ({
    name: key,
    gamine: gamineRange[key],
    hookfish: hookfishRange[key],
  }));

  return { chartData };
};

export const ContractorChart = ({ data }: { data: GetCompRange }) => {
  const { chartData } = useContractorChartData(data);
  return (
    <PercentileBarChart
      title="Contractor Total Compensation Percentiles"
      chartData={chartData}
    />
  );
};
