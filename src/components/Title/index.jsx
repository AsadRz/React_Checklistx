import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';

function Title(props) {
  const { text } = props;
  const classes = useStyles(props);
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography variant="h6" className={classes.text} {...props}>
      {text}
    </Typography>
  );
}

Title.defaultProps = {
  size: 32,
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.number,
};

export default Title;
