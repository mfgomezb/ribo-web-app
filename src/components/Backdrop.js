import React from 'react';
import {createPortal} from 'react-dom';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    backdropFilter: "blur(2px)",
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}));


const Backdrop = () => {
  const classes = useStyles();
  const backdropRoot = document.getElementById('backdrop');
  return createPortal(<div className={classes.root} />, backdropRoot);
};

export default Backdrop;
