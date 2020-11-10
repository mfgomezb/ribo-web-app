import axios from '../utils/axios';
import { useMutation, queryCache, useQueryCache } from 'react-query'

export const useProcessPayment = () => {
  return useMutation(
    (values) => {
      return axios.post(`api/payment/process/${values._loanSchedule}`, values).then((res) => res.data);
    }
  )
}


export const usePaymentDelete = () => {
  const cache = useQueryCache()
  return useMutation(
    (values) => {
      return axios.delete(`api/payment/installment/${values._id}`).then((res) => res.data);
    },
    {
      // onMutate: (values) => {
      //
      //   let oldInstallment = cache.getQueryData(['installment', values._loanSchedule])
      //   let payments = oldInstallment[0].payments.push({...values, _id: values._loanSchedule})
      //
      //   cache.setQueryData(['installment', values._loanSchedule], payments)
      //
      //   return () => cache.setQueryData(['installment', values._loanSchedule], oldInstallment)
      // },
      // onError: (err, newTodo, rollback) => rollback(),
      onSuccess: (data, variables) => {
        cache.invalidateQueries(["loanSchedule", data._loan])
        cache.invalidateQueries(["loanDetails", data._loan])
        cache.invalidateQueries(["installment", data._loanSchedule])
        cache.invalidateQueries(["loanPayments", data._loan])
      },
    }
  )
}
