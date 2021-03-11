import { useContext } from 'react';
import GlobalContext from 'src/contexts/GlobalContext';

const useGlobal = () => useContext(GlobalContext);

export default useGlobal;

