import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import {
  Avatar,
  Card,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useGetPortfolioSummary } from '../../../hooks/useDashboard';
import { useOfFunds } from '../../../utils/constants';
import { currencyFormat } from '../../../utils/numbers'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  avatar: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.common.white
  }
}));


const TopReferrals = ({ className, country, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { isLoading, data, error } = useGetPortfolioSummary(country)

  const productsData = !isLoading && data.portfolioSummary.sort( (a,b) =>  b.returnsGenerated - a.returnsGenerated )


  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Productos más rentables"
      />
      <Divider />
      <List disablePadding>
        {!isLoading && productsData.map((product, i) => (
          <ListItem
            divider={i < productsData.length - 1}
            key={product.product}
          >
            <ListItemAvatar>
              <Avatar
                className={classes.avatar}
                style={{ backgroundColor: product.color }}
              >
                {i+1}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={useOfFunds[product.product]}
              primaryTypographyProps={{ variant: 'h6' }}
            />
            <Typography
              variant="body2"
              color="textSecondary"
            >
              {currencyFormat(product.returnsGenerated, '$')} por $
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

TopReferrals.propTypes = {
  className: PropTypes.string
};

export default TopReferrals;
