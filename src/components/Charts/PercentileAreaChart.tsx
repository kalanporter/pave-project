import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

export const PercentileAreaChart = ({
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
      <AreaChart
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
            dx: -40,
            dy: -30,
            angle: -90,
            value: 'USD',
          }}
        />
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
