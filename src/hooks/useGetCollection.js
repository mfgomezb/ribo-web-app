import axios from '../utils/axios';
import { usePaginatedQuery } from 'react-query';
import Qs from 'qs';
import moment from 'moment';

export const useGetCollection = (params) => {
  console.log(params)
  let queryParams = Qs.stringify({ ...params, fields: 'fullName,email,businessName' }, {encode: false})
  console.log(queryParams)
  return usePaginatedQuery(['collection', params], () =>
    axios.get(`api/reporting/collector?${queryParams}`)
      .then(res => {
        return res.data
      }), {staleTime: Infinity })
};

export const useGetCollectionHistogram = (country) => {
  let params = {
    filters: {
      country: country,
    },
    limit: 25,
    maxDays: '360',
    minDays: '0',
    page: 0,
    query: '',
    selectedDate: moment().add('days', 1).format('YYYY-MM-DD'),
  }

  let queryParams = Qs.stringify({ ...params, fields: 'fullName,email,businessName' }, {encode: false})
  return usePaginatedQuery(['histogram', country], () =>
    axios.get(`api/reporting/portfolio/collection-summary/histogram?${queryParams}`)
      .then(res => {
        return res.data
      }), {staleTime: Infinity })
};



