import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  chartContainer: {
    paddingTop: 40,
    paddingBottom: 40,
  },
}));

const useChartData = ({ getRestaurantSalaryRanges }: any) => {
  const hookfish = getRestaurantSalaryRanges[0].employmentTypeCompRange[1];
  const gamine = getRestaurantSalaryRanges[1].employmentTypeCompRange[1];

  const chartData = Object.keys(gamine.range).map((key: string) => ({
    name: key,
    hookfish: hookfish.range[key],
    gamine: gamine.range[key],
  }));

  chartData.pop();

  return { chartData };
};

export const FullTimeChart = ({ data }: { data: any }) => {
  const classes = useStyles();
  const { chartData } = useChartData(data);
  return (
    <Grid className={classes.chartContainer}>
      <Typography variant="h2" style={{ textAlign: 'center' }}>
        Full Time Employee Salary Ranges
      </Typography>
      <AreaChart width={1000} height={400} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="hookfish"
          stroke="#001b56"
          fill="#001b56"
        />
        <Area
          type="monotone"
          dataKey="gamine"
          stroke="#13b8a6"
          fill="#13b8a6"
        />
      </AreaChart>
    </Grid>
  );
};
