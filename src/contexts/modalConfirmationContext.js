import React, {useContext, useRef, useState} from "react";
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core';

const ConfirmationModalContext = React.createContext({});

const ConfirmationModalContextProvider = (props) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const resolver = useRef();

  const handleShow = () => {
    setShowConfirmationModal(true);

    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    setShowConfirmationModal(false)
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    setShowConfirmationModal(false)
  };

  return (
    <ConfirmationModalContext.Provider value={{showConfirmation: handleShow}}>
      {props.children}

      <Dialog open={showConfirmationModal} onClose={() => setShowConfirmationModal(false)}>
        <DialogTitle>
          Estás seguro que quieres realizar esta acción?
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleOk}>Aceptar</Button>
        </DialogActions>
      </Dialog>

    </ConfirmationModalContext.Provider>
  )
};

export const useConfirmationModalContext = () => useContext(ConfirmationModalContext);
export default ConfirmationModalContextProvider;
