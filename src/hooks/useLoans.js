import axios from '../utils/axios';
import { useQuery } from 'react-query';


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
