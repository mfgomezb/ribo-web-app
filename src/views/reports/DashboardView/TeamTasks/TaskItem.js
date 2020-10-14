import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemText,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles((theme) => ({
  root: {},
  viewButton: {
    marginLeft: theme.spacing(2)
  }
}));

const TaskItem = ({ className, payment, ...rest }) => {
  const classes = useStyles();

  let deadline = 'N/A';

  // if (payment.deadline) {
  //   const now = moment();
  //   const deadlineMoment = moment(payment.deadline);
  //
  //   if (deadlineMoment.isAfter(now) && deadlineMoment.diff(now, 'day') < 3) {
  //     deadline = `${deadlineMoment.diff(now, 'day')} days remaining`;
  //   }
  // }

  return (
    <ListItem
      className={clsx(classes.root, className)}
      {...rest}
    >
      <ListItemText
        primary={payment.fullname}
        primaryTypographyProps={{ variant: 'h6', noWrap: true }}
        secondary={deadline}
      />
      <AvatarGroup max={3}>
        {/*{payment.members.map((member) => (*/}
        {/*  <Tooltip*/}
        {/*    key={member.fullname}*/}
        {/*    title="View"*/}
        {/*  >*/}
        {/*    /!*<Avatar src={member.avatar} />*!/*/}
        {/*  </Tooltip>*/}
        {/*))}*/}
      </AvatarGroup>
      <Tooltip title="Ver prestamos">
        <IconButton
          className={classes.viewButton}
          edge="end"
        >
          <OpenInNewIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

TaskItem.propTypes = {
  className: PropTypes.string,
  task: PropTypes.object.isRequired
};

export default TaskItem;
