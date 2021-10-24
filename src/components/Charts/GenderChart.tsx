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

const useGenderChartData = ({ getRestaurantCompRanges }: GetCompRange) => {
  const chartData = ['p10', 'p25', 'p50', 'p75', 'p90'].map((key: string) => ({
    name: key,
    'Hookfish Male': getRestaurantCompRanges[0].genderRange[0].range[key],
    'Hookfish Female': getRestaurantCompRanges[0].genderRange[1].range[key],
    'Gamine Male': getRestaurantCompRanges[1].genderRange[0].range[key],
    'Gamine Female': getRestaurantCompRanges[1].genderRange[1].range[key],
  }));

  return { chartData };
};

export const GenderChart = ({ data }: { data: GetCompRange }) => {
  const classes = useStyles();
  const { chartData } = useGenderChartData(data);
  return (
    <Grid className={classes.chartContainer}>
      <Typography variant="h2" className={classes.text}>
        Compensation Percentiles by Gender
      </Typography>
      <BarChart
        width={1000}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ dy: 50, value: 'Percentile' }} />
        <YAxis label={{ dx: -50, dy: -30, angle: -90, value: 'USD' }} />
        <Tooltip />
        <Legend align="left" />
        <Bar dataKey="Hookfish Male" fill="#001b56" />
        <Bar dataKey="Gamine Male" fill="#13b8a6" />
        <Bar dataKey="Hookfish Female" fill="#FCC644" />
        <Bar dataKey="Gamine Female" fill="#C857E7" />
      </BarChart>
    </Grid>
  );
};
