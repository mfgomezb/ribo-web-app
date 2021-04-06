import axios from '../utils/axios';
import { useMutation, usePaginatedQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import useAuth from './useAuth';
import Qs from 'qs';

export const useUpdatePassword = (id) => {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    (passwordDetails) =>
      axios
        .patch(`api/users/${id}/update-password`, passwordDetails)
        .then((res) => res.data),
    {
      onSuccess: () =>
        enqueueSnackbar('Password updated', {
          variant: 'success'
        }),
      onError: (error) => {
        enqueueSnackbar(`${error.errors.msg[0].msg}`, {
          variant: 'error'
        });
      }
    }
  );
};

export const useUpdateUser = (id) => {
  const { enqueueSnackbar } = useSnackbar();
  const { updateUser } = useAuth();

  return useMutation(
    (userDetails) =>
      axios
        .patch(`api/users/${id}/general-profile`, userDetails)
        .then((res) => {
          updateUser(res.data);
          return res.data;
        }),
    {
      onSuccess: () =>
        enqueueSnackbar('User updated', {
          variant: 'success'
        }),
      onError: (error) => {
        enqueueSnackbar(`${error.errors.msg[0].msg}`, {
          variant: 'error'
        });
      }
    }
  );
};

export const useGetUsers = (params) => {
  let queryParams = Qs.stringify({ ...params, filter: params.query, fields: 'fullName,email,businessName' }, {encode: false})
  return usePaginatedQuery(['users',params], () =>
    axios.get(`api/customers?${queryParams}`)
      .then(res => {
        return res.data
      }), {})

}

export const useGetUser = (userId) => {
  return usePaginatedQuery(['user',userId], () =>
    axios.get(`api/customers/${userId}`)
      .then(res => {
        return res.data
      }), {})
}

export const checkEmail = (email) => {
    return axios.post(`api/customers/check-email`, { email: email })
      .then( res => {
        return res.data
      })
      .catch(err => {
        return err
      })
}

export const createNewUser = (values) => {

  return axios.post('api/customers/', { ...values })
    .then( res => {
      return res.data
    })
    .catch(err => {
      return err
    })
}
