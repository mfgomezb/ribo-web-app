import axios from '../utils/axios';
import { useMutation, } from 'react-query'

export const useNewCollateral = (loanId, values) => {
  return useMutation(
    (values) => {
      return axios.post(`api/collateral/${loanId}`, values).then((res) => res.data);
    }
  )
}

