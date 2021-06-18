import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TaskItem from './TaskItem';
import { useGetPayments } from '../../../../hooks/useDashboard';

const useStyles = makeStyles(() => ({
  root: {}
}));

const TeamTasks = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const periodPayments = useGetPayments('PERU', 'month')
  console.log(periodPayments)
  // const getTasks = useCallback(async () => {
  //   try {
  //     const response = await axios.get('/api/reports/latest-tasks');
  //
  //     if (isMountedRef.current) {
  //       setTasks(response.data.tasks);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, [isMountedRef]);
  //
  // useEffect(() => {
  //   getTasks();
  // }, [getTasks]);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Team Tasks"
      />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={400} maxHeight={400}>
          <List>
            {!periodPayments.isLoading && periodPayments.data.collectionsDetail.map((payment, i) => (
              <TaskItem
                divider={i < payment.length - 1}
                key={payment._id}
                payment={payment}
              />
            ))}
          </List>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

TeamTasks.propTypes = {
  className: PropTypes.string
};

export default TeamTasks;
