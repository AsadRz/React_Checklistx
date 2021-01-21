import React from 'react';
import useStyles from './style';

import logo from '../../../assets/images/visionx.svg';

export default function Header() {
  const classes = useStyles();
  return (
    <div className={classes.logo__title__container}>
      <div className={classes.logo__container}>
        <img src={logo} alt="VisionX" className={classes.logo_img} />
      </div>
    </div>
  );
}
