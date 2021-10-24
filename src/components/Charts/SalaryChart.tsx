import React from 'react';
import { GetCompRange } from '../graphql/types';
import { PercentileBarChart } from './PercentileBarChat';

const useSalaryChartData = ({ getRestaurantSalaryRanges }: GetCompRange) => {
  const hookfishRange = getRestaurantSalaryRanges[0].range;
  const gamineRange = getRestaurantSalaryRanges[1].range;

  const chartData = ['p10', 'p25', 'p50', 'p75', 'p90'].map((key: string) => ({
    name: key,
    gamine: gamineRange[key],
    hookfish: hookfishRange[key],
  }));

  return { chartData };
};

export const SalaryChart = ({ data }: { data: GetCompRange }) => {
  const { chartData } = useSalaryChartData(data);
  return (
    <PercentileBarChart title="Salary Percentiles" chartData={chartData} />
  );
};
