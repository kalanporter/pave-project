import React from 'react';
import { GetCompRange } from '../graphql/types';
import { PercentileBarChart } from './PercentileBarChart';

const useBonusChartData = ({ getRestaurantBonusRanges }: GetCompRange) => {
  const hookfishRange = getRestaurantBonusRanges[0].range;
  const gamineRange = getRestaurantBonusRanges[1].range;

  const chartData = ['p10', 'p25', 'p50', 'p75', 'p90'].map((key: string) => ({
    name: key,
    gamine: gamineRange[key],
    hookfish: hookfishRange[key],
  }));

  return { chartData };
};

export const BonusChart = ({ data }: { data: GetCompRange }) => {
  const { chartData } = useBonusChartData(data);
  return <PercentileBarChart title="Bonus Percentiles" chartData={chartData} />;
};
