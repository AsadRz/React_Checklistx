import React from 'react';
import PropTypes from 'prop-types';
import { Avatar as CircularAvatar } from '@material-ui/core';
import clsx from 'clsx';
import { getInitials } from '../../utils';

import useStyles from './style';

function Avatar(props) {
  const classes = useStyles();
  const { displayPhoto, displayName, small } = props;

  if (displayPhoto === '') {
    return (
      <CircularAvatar className={clsx(small && classes.smallSize)}>
        {getInitials(displayName)}
      </CircularAvatar>
    );
  }

  return (
    <CircularAvatar
      className={clsx(small && classes.smallSize)}
      alt={displayName}
      src={displayPhoto}
    />
  );
}

Avatar.defaultProps = {
  displayPhoto: '',
  displayName: '',
  small: false,
};

Avatar.propTypes = {
  displayName: PropTypes.string,
  displayPhoto: PropTypes.string,
  small: PropTypes.bool,
};

export default Avatar;
