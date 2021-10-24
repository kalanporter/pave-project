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

const useDepartmentChartData = ({ getRestaurantCompRanges }: GetCompRange) => {
  const chartData = ['p10', 'p25', 'p50', 'p75', 'p90'].map((key: string) => ({
    name: key,
    'Hookfish Operations':
      getRestaurantCompRanges[0].departmentCompRange[0].range[key],
    'Hookfish Management':
      getRestaurantCompRanges[0].departmentCompRange[1].range[key],
    'Hookfish Front of House':
      getRestaurantCompRanges[0].departmentCompRange[2].range[key],
    'Hookfish Kitchen':
      getRestaurantCompRanges[0].departmentCompRange[3].range[key],
    'Gamine Operations':
      getRestaurantCompRanges[1].departmentCompRange[0].range[key],
    'Gamine Management':
      getRestaurantCompRanges[1].departmentCompRange[1].range[key],
    'Gamine Front of House':
      getRestaurantCompRanges[1].departmentCompRange[2].range[key],
    'Gamine Kitchen':
      getRestaurantCompRanges[1].departmentCompRange[3].range[key],
  }));

  return { chartData };
};

export const DepartmentChart = ({ data }: { data: GetCompRange }) => {
  const classes = useStyles();
  const { chartData } = useDepartmentChartData(data);
  return (
    <Grid className={classes.chartContainer}>
      <Typography variant="h2" className={classes.text}>
        Compensation Percentiles by Department
      </Typography>
      <BarChart
        width={1000}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 30, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ dy: 70, value: 'Percentile' }} />
        <YAxis label={{ dx: -50, dy: -30, angle: -90, value: 'USD' }} />
        <Tooltip />
        <Legend align="left" />
        <Bar dataKey="Hookfish Operations" fill="#001b56" />
        <Bar dataKey="Gamine Operations" fill="#001b56" />
        <Bar dataKey="Hookfish Management" fill="#13b8a6" />
        <Bar dataKey="Gamine Management" fill="#13b8a6" />
        <Bar dataKey="Hookfish Front of House" fill="#FCC644" />
        <Bar dataKey="Gamine Front of House" fill="#FCC644" />
        <Bar dataKey="Hookfish Kitchen" fill="#C857E7" />
        <Bar dataKey="Gamine Kitchen" fill="#C857E7" />
      </BarChart>
    </Grid>
  );
};
