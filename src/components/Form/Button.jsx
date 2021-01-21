import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  valid: {
    backgroundColor: theme.palette.common.blue,
    color: theme.palette.common.white,
    borderColor: theme.palette.common.blue,
    '&:hover': {
      backgroundColor: theme.palette.common.lightBlue,
      // boxShadow: `0 0 0 ${theme.theme.Yellow.secondary}`,
    },
  },
  cancelButton: {
    border: 'none',
  },
}));

export default function CustomButton(props) {
  const classes = useStyles();
  const { valid, label, handleClick, type } = props;
  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      className={clsx(
        classes.button,
        valid && classes.valid,
        type === 'cancel' && classes.cancelButton
      )}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {label}
    </Button>
  );
}

CustomButton.defaultProps = {
  valid: false,
  label: 'Submit',
  type: 'main',
  handleClick: () => {},
};

CustomButton.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  valid: PropTypes.bool,
};
