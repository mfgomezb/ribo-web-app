import React from 'react';
import {createPortal} from 'react-dom';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';


const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: 'auto',
    width: '400px',
    height: '150px',
    // boxShadow: 0 5px 10px 2px rgba(195, 192, 192, 0.5),
    padding: '20px',
    textAlign: 'center',
    borderRadius: '6px',
  },
}));

const Modal = ({children}) => {
  const modalRoot = document.getElementById('modal');
  return createPortal(<div className="modal">{children}</div>, modalRoot);
};

export default Modal;
