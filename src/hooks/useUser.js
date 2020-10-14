import axios from '../utils/axios';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import useAuth from './useAuth';

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
