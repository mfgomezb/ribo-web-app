import axios from '../utils/axios';
import { useMutation, } from 'react-query'

export const useNewCommission = (loanId, values) => {
  return useMutation(
    (values) => {
      return axios.post(`api/commission/${loanId}`, values).then((res) => res.data);
    }
  )
}

