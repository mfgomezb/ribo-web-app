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
    case 'past_month':
      gtDate = DateTime.local().minus({ month: 1 }).startOf('month').toString().slice(0,10)
      ltDate = DateTime.local().minus({ month: 1 }).endOf('month').toString().slice(0,10)
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
    case 'last_60_days':
      gtDate = DateTime.local().minus({ days: 60 }).toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
    case 'last_year':
      gtDate = DateTime.local().minus({ days: 360 }).toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
    default:
      gtDate = DateTime.local().startOf('month').toString().slice(0,10)
      ltDate = DateTime.local().endOf('day').toString().slice(0,10)
      break;
  }
  return {gtDate, ltDate}
}


export const useGetInvestorReturn = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorReturn', investmentAccount], () =>
      axios.get(`api/investor-profile/returns/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorReturnYTD = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorReturnYTD', investmentAccount], () =>
      axios.get(`api/investor-profile/returns-ytd/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorTotalAssets = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorTotalAssets', investmentAccount], () =>
      axios.get(`api/investor-profile/total-assets/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorTotalCash = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorTotalCash', investmentAccount], () =>
      axios.get(`api/investor-profile/total-cash/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorTotalInvestments = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorTotalInvestments', investmentAccount], () =>
      axios.get(`api/investor-profile/total-investments/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorHistoricIncome = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorHistoricIncome', investmentAccount], () =>
      axios.get(`api/investor-profile/historic-income/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}


export const useGetInvestorHistoricInterest = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorHistoricInterest', investmentAccount], () =>
      axios.get(`api/investor-profile/historic-interest/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorCumulativeIncome = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorCumulativeIncome', investmentAccount], () =>
      axios.get(`api/investor-profile/cumulative-income/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorCumulativeInterest = (investmentAccount, period) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorCumulativeInterest', investmentAccount], () =>
      axios.get(`api/investor-profile/cumulative-interest/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorAllocation = (investmentAccount) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['investorAllocation', investmentAccount], () =>
      axios.get(`api/investor-profile/historic-allocation/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}


export const useGetInvestorPortfolioSegmentation = (investmentAccount) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['portfolioSegmentation', investmentAccount], () =>
      axios.get(`api/investor-profile/portfolio-segmentation/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

export const useGetInvestorPortfolioCollection = (investmentAccount) => {
  // let {gtDate, ltDate} = dateRangeSelection(period)
  return useQuery(['portfolioCollection', investmentAccount], () =>
      axios.get(`api/investor-profile/portfolio-collection/${investmentAccount}`)
        .then(res => {
          return res.data
        }),
    { staleTime: Infinity }
  )
}

