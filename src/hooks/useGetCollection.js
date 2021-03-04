import axios from '../utils/axios';
import { usePaginatedQuery, useQuery } from 'react-query';
import Qs from 'qs';

export const useGetCollection = (params) => {
  let queryParams = Qs.stringify({ ...params, fields: 'fullName,email,businessName' }, {encode: false})
  return usePaginatedQuery(['collection', params], () =>
    axios.get(`api/reporting/collector?${queryParams}`)
      .then(res => {
        return res.data
      }), {staleTime: Infinity })
};



