import axios from '../utils/axios';
import { useQuery } from 'react-query';
import { DateTime } from 'luxon';

const dateRangeSelection = (period) => {
  let gtDate
  let ltDate
  switch (period) {
    case 'today':
      gtDate = DateTime.local().startOf('day').toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
    case 'month':
      gtDate = DateTime.local().startOf('month').toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
    case 'week':
      gtDate = DateTime.local().startOf('week').toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
    case 'year':
      gtDate = DateTime.local().startOf('year').toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
    case 'last_7_days':
      gtDate = DateTime.local().minus({ days: 7 }).toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
    case 'last_30_days':
      gtDate = DateTime.local().minus({ days: 30 }).toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
    case 'last_year':
      gtDate = DateTime.local().minus({ days: 360 }).toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
  }
  return {gtDate, ltDate}
}

export const useGetTodayStatus = (country, period) => {
  let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['todayStatus', country, period], () =>
    axios.get(`api/test/summary/status/${country}/period/${gtDate}/${ltDate}`)
      .then(res => {
        return res.data
      }),
    { staleTime: Infinity }
  )
}



export const useGetPayments = (country, period) => {
  let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['payments', country, period], () =>
    axios.get(`api/test/summary/payments/${country}/${gtDate}/${ltDate}`)
      .then(res => {
        return res.data
      }),
    { staleTime: Infinity }
  )
}

export const useReceivedPayments = (country, period) => {
  let {gtDate, ltDate} = dateRangeSelection(period)
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

export const useConceptTotals = (concept, country, period) => {
  let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['concept', concept, country, period], () =>
    axios
      .get(
        `api/test/summary/concept/${concept}/country/${country}/period/${gtDate}/${ltDate}`
      )
      .then(res => res.data),
    { staleTime: Infinity }
  )
}

export const useLoansDisbursed = (country, period) => {
  return useQuery(['loansDisbursed', country, period], () =>
    axios
      .get(`api/loans/disbursed/country/${country}/period/${period}`)
      .then(res => res.data)
  );
};
