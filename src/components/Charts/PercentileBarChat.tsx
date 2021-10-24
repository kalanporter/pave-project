import React from 'react';
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

export type ChartData = { name: string; hookfish: number; gamine: number }[];

export const PercentileBarChart = ({
  chartData,
  title,
}: {
  title: string;
  chartData: ChartData;
}) => {
  const classes = useStyles();
  return (
    <Grid className={classes.chartContainer}>
      <Typography variant="h2" className={classes.text}>
        {title}
      </Typography>
      <BarChart
        width={1000}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{
            dy: 20,
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
        <Bar dataKey="hookfish" fill="#001b56" />
        <Bar dataKey="gamine" fill="#13b8a6" />
      </BarChart>
    </Grid>
  );
};
