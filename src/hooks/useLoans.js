import axios from '../utils/axios';
import { usePaginatedQuery, useQuery } from 'react-query';
import Qs from 'qs';


export const useBorrowerLoans = (borrowerId) => {
  return useQuery(['loans', borrowerId], () =>
    axios
      .get(`api/loan/list/borrower/${borrowerId}`)
      .then(res => res.data),
    { staleTime: Infinity }
  );
};

export const useBorrowerUnpaidSchedule = (borrowerId) => {
  return useQuery(['unpaid30days', borrowerId], () =>
      axios
        .get(`api/loan/schedule/list/unpaid30days/borrower/${borrowerId}`)
        .then(res => res.data),
    { staleTime: Infinity }
  );
};


export const useBorrowerCreditDetails = (borrowerId) => {
  return useQuery(['creditDetails', borrowerId], () =>
      axios
        .get(`api/loan/credit-details/borrower/${borrowerId}`)
        .then(res => res.data),
    { staleTime: Infinity }
  );
};

export const useLoanScheduleLoanView = (loanId) => {
  return useQuery(['loanSchedule',loanId], () =>
      axios
        .get(`api/loan/schedule-view/${loanId}`)
        .then(res => res.data),
    { staleTime: 2000, }
  )
};

export const useLoanPaymentsView = (loanId) => {
  return useQuery(['loanPayments',loanId], () =>
      axios
        .get(`api/loan/payments-view/${loanId}`)
        .then(res => res.data),
    {staleTime: 2000, }
  )
};

export const useLoanDetailsView = (loanId) => {
  return useQuery(['loanDetails',loanId], () =>
      axios
        .get(`api/loan/details-view/${loanId}`)
        .then(res => res.data),
    { staleTime: 2000,}
  )
};

export const useGetLoanInstallment = (installmentId) => {
    return useQuery(['installment', installmentId], () =>
        installmentId && axios.get(`api/loan/installment-view/${installmentId}`)
          .then(res => res.data),
{
          staleTime: 2000,
          }
    )
};

export const useGetLoanList = (params) => {
  let queryParams = Qs.stringify({ ...params, filter: params.query, fields: 'fullName,email,businessName' }, {encode: false})
  return usePaginatedQuery(['loan-search', params], () =>
    axios.get(`api/loan/loans-search?${queryParams}`)
      .then(res => {
        return res.data
      }), { staleTime: Infinity })
}

export const useGetScheduleList = (params) => {
  let queryParams = Qs.stringify({ ...params, filter: params.query, fields: 'fullName,email,businessName' }, {encode: false})
  return usePaginatedQuery(['schedule-search', params], () =>
    axios.get(`api/loan/schedule-search?${queryParams}`)
      .then(res => {
        return res.data
      }), {staleTime: Infinity })
}
