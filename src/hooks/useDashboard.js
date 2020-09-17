import axios from '../utils/axios';
import { useQuery } from 'react-query';

export const useReceivedPayments = period => {
  return useQuery(['receivedPayments', period], () =>
    axios.get(`api/payments/received/${period}`).then(res => res.data)
  );
};

export const useCollection = status => {
  return useQuery(['collections', status], () =>
    axios.get(`api/collection/${status}`).then(res => res.data)
  );
};

export const useLoansDisbursed = period => {
  return useQuery(['loansDisbursed', period], () =>
    axios.get(`api/loans/disbursed/${period}`).then(res => res.data)
  );
};
