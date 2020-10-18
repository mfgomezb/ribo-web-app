import axios from '../utils/axios';
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';


export const useGetTodayStatus = (country) => {
  return useQuery(['todayStatus', country], () =>
    axios.get(`api/test/summary/status/${country}`)
      .then(res => {
        return res.data
      }),
    { staleTime: Infinity }
  )
}


export const useGetPayments = (country, period) => {
  let gtDate
  let ltDate
  if (period === 'month') {
    gtDate = DateTime.local().startOf('month').toString().slice(0,10)
    ltDate = DateTime.local().toString().slice(0,10)
  }
  return useQuery(['payments', country, period], () =>
    axios.get(`api/test/summary/payments/${country}/${gtDate}/${ltDate}`)
      .then(res => {
        return res.data
      }),
    { staleTime: Infinity }
  )
}

export const useReceivedPayments = (country, period) => {
  return useQuery(['receivedPayments', country, period], () =>
    axios
      .get(`api/payments/received/country/${country}/period/${period}`)
      .then(res => res.data),
    { staleTime: Infinity }
  );
};

export const useCollection = (country, status) => {
  return useQuery(['collections', country, status], () =>
    axios
      .get(`api/collection/country/${country}/status/${status}`)
      .then(res => res.data),
    { staleTime: Infinity }
  );
};

export const useCashAvailable = country => {
  return useQuery(['cashAvailable', country], () =>
    axios
      .get(`api/transactions/cash-available/country/${country}`)
      .then(res => res.data),
    { staleTime: Infinity }
  );
};

export const useInterestEarned = (country, period) => {
  return useQuery(['interestEarned', country, period], () =>
    axios
      .get(
        `api/transactions/interest-earned/country/${country}/period/${period}`
      )
      .then(res => res.data),
    { staleTime: Infinity }
  );
};

export const useLoansDisbursed = (country, period) => {
  return useQuery(['loansDisbursed', country, period], () =>
    axios
      .get(`api/loans/disbursed/country/${country}/period/${period}`)
      .then(res => res.data)
  );
};
