import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  progress: {
    opacity: 0.6,
    '&.MuiCircularProgress-colorPrimary': {
      color: theme.palette.common.lightBlack,
    },
  },
}));

export default function Loader(props) {
  const classes = useStyles();
  const { show, size } = props;

  return show ? (
    <CircularProgress className={classes.progress} disableShrink size={size} />
  ) : null;
}

Loader.defaultProps = {
  show: false,
  size: 100,
};

Loader.propTypes = {
  show: PropTypes.bool,
  size: PropTypes.number,
};
