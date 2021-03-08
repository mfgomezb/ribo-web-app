import React, { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Calendar as CalendarIcon, Globe as GlobeIcon, Loader } from 'react-feather';

const timeRanges = [
  {
    id: 'today',
    text: 'Hoy'
  },
  {
    id: 'week',
    text: 'Semana'
  },
  {
    id: 'month',
    text: 'Mes'
  },
  {
    id: 'year',
    text: 'Año'
  },
  {
    id: 'last_7_days',
    text: '7 días'
  },
  {
    id: 'last_30_days',
    text: '30 días'
  },
  {
    id: 'last_year',
    text: '360 días'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = ({ className,
                  country,
                  countries,
                  setCountry,
                  timeRange,
                  timeRanges,
                  setTimeRange,
                  ...rest }) => {
  const classes = useStyles();
  const actionRef = useRef(null);
  const actionCountryRef = useRef(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isCountryMenuOpen, setCountryMenuOpen] = useState(false);

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Typography variant="body1" color="textPrimary">
            Reports
          </Typography>
        </Breadcrumbs>
        <Typography variant="h3" color="textPrimary">
          Reporte general
        </Typography>
      </Grid>
      <Grid item>
        <Button
          ref={actionCountryRef}
          onClick={() => setCountryMenuOpen(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <GlobeIcon />
            </SvgIcon>
          }
        >

          {countries.find(e => country === e.id)?.name}
        </Button>
        <Menu
          anchorEl={actionCountryRef.current}
          onClose={() => setCountryMenuOpen(false)}
          open={isCountryMenuOpen}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {countries.map(_country => (
            <MenuItem
              key={_country.id}
              onClick={() => setCountry(_country.id)}
            >
              {_country.name}
            </MenuItem>
          ))}
        </Menu>
        <Button
          ref={actionRef}
          onClick={() => setMenuOpen(true)}
          startIcon={
            <SvgIcon fontSize="small">
              <CalendarIcon />
            </SvgIcon>
          }
        >
          {timeRanges.find(e => timeRange === e.id).text}
        </Button>
        <Menu
          anchorEl={actionRef.current}
          onClose={() => setMenuOpen(false)}
          open={isMenuOpen}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          {timeRanges.map(_timeRange => (
            <MenuItem
              key={_timeRange.id}
              onClick={() => setTimeRange(_timeRange.id)}
            >
              {_timeRange.text}
            </MenuItem>
          ))}
        </Menu>

      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
