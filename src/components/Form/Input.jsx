/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ErrorIcon from '@material-ui/icons/Error';
import Tooltip from '@material-ui/core/Tooltip';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  containter: {
    position: 'relative',
  },
  inputRoot: {
    background: theme.palette.common.lighteshWhite,
    borderRadius: 6,
    border: '1px solid transparent',
  },
  inputProp: {
    padding: theme.spacing(1, 2),
  },
  error: {
    borderColor: theme.palette.common.red,
  },
  visibility: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: theme.palette.grey[500],
  },
  errorIconContainer: {
    borderColor: theme.palette.common.red,
    position: 'absolute',
    right: -32,
    top: 8,
  },
}));

export default function Input(props) {
  const classes = useStyles();
  const {
    type,
    id,
    name,
    value,
    handleChange,
    handleBlur,
    error,
    placeholder,
  } = props;

  const [fieldType, setFieldType] = useState(type);

  const showPassword = () => {
    if (fieldType === 'password') {
      setFieldType('text');
    } else {
      setFieldType('password');
    }
  };

  return (
    <div className={classes.containter}>
      <InputBase
        type={fieldType}
        name={name}
        id={id}
        value={value}
        fullWidth
        error={error}
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputProp,
          error: classes.error,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {type === 'password' ? (
        <div onClick={() => showPassword()}>
          {fieldType === 'password' ? (
            <VisibilityOffIcon className={classes.visibility} />
          ) : (
            <VisibilityIcon className={classes.visibility} />
          )}
        </div>
      ) : null}
      {type === 'password' && error && error !== 'required' ? (
        <Tooltip
          arrow
          title={error}
          aria-label="error"
          placement="right"
          className={classes.errorIconContainer}
        >
          <ErrorIcon color="error" className={classes.error_icon} />
        </Tooltip>
      ) : null}
    </div>
  );
}

Input.defaultProps = {
  handleBlur: () => {},
  error: '',
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func,
  error: PropTypes.string,
};
