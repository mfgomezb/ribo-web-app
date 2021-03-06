import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import {
  fade,
  makeStyles,
  useTheme
} from '@material-ui/core';
import { currencyFormat } from '../../../../utils/numbers';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  }
}));

const Chart = ({
  data: dataProp,
  labels,
  className,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        label: 'Interes',
        backgroundColor: theme.palette.secondary.main,
        data: dataProp.interest,
        barThickness: 15,
        maxBarThickness: 17,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
      {
        label: 'Capital',
        backgroundColor: fade(theme.palette.secondary.main, 0.35),
        data: dataProp.capital,
        barThickness: 15,
        maxBarThickness: 17,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      }
    ],
    labels
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cornerRadius: 20,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0,
            maxTicksLimit: 5,
            callback: (value) => (value > 0 ? `${(value)/1000}K` : value)
          }
        }
      ]
    },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.background.dark,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        title: () => {},
        label: (tooltipItem, data) => {
          let dataset = data.datasets[tooltipItem.datasetIndex]
          let index = tooltipItem.index
          let labelNumber = dataset.data[index] > 1000 ? currencyFormat(dataset.data[index]/1000, '$', 4)+'K' : currencyFormat(dataset.data[index]/1000, '$', 4)
          return dataset.label + `: ` + labelNumber
        },

      }
    }
  };

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
};

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired
};

export default Chart;
