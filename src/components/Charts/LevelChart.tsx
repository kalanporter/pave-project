import React from 'react';
import { GetCompRange } from '../graphql/types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const useStyles = makeStyles(() => ({
  chartContainer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
  text: {
    textAlign: 'center',
  },
}));

const useLevelChartData = ({ getRestaurantCompRanges }: GetCompRange) => {
  const chartData = ['p10', 'p25', 'p50', 'p75', 'p90'].map((key: string) => ({
    name: key,
    'Hookfish L1': getRestaurantCompRanges[0].levelCompRange[0].range[key],
    'Hookfish L2': getRestaurantCompRanges[0].levelCompRange[1].range[key],
    'Hookfish L3': getRestaurantCompRanges[0].levelCompRange[2].range[key],
    'Hookfish L4': getRestaurantCompRanges[0].levelCompRange[3].range[key],
    'Hookfish L5': getRestaurantCompRanges[0].levelCompRange[4].range[key],
    'Gamine L1': getRestaurantCompRanges[1].levelCompRange[0].range[key],
    'Gamine L2': getRestaurantCompRanges[1].levelCompRange[1].range[key],
    'Gamine L3': getRestaurantCompRanges[1].levelCompRange[2].range[key],
    'Gamine L4': getRestaurantCompRanges[1].levelCompRange[3].range[key],
    'Gamine L5': getRestaurantCompRanges[1].levelCompRange[4].range[key],
  }));

  return { chartData };
};

export const LevelChart = ({ data }: { data: GetCompRange }) => {
  const classes = useStyles();
  const { chartData } = useLevelChartData(data);
  return (
    <Grid className={classes.chartContainer}>
      <Typography variant="h2" className={classes.text}>
        Compensation Percentiles by Level
      </Typography>
      <BarChart
        width={1000}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{
            dy: 70,
            value: 'Percentile',
          }}
        />
        <YAxis
          label={{
            dx: -50,
            dy: -30,
            angle: -90,
            value: 'USD',
          }}
        />
        <Tooltip />
        <Legend align="left" />
        <Bar dataKey="Hookfish L1" fill="#001b56" />
        <Bar dataKey="Gamine L1" fill="#001b56" />
        <Bar dataKey="Hookfish L2" fill="#13b8a6" />
        <Bar dataKey="Gamine L2" fill="#13b8a6" />
        <Bar dataKey="Hookfish L3" fill="#FCC644" />
        <Bar dataKey="Gamine L3" fill="#FCC644" />
        <Bar dataKey="Hookfish L4" fill="#C857E7" />
        <Bar dataKey="Gamine L4" fill="#C857E7" />
        <Bar dataKey="Hookfish L5" fill="#8363EE" />
        <Bar dataKey="Gamine L5" fill="#8363EE" />
      </BarChart>
    </Grid>
  );
};
