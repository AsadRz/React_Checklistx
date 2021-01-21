/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import Header from '../../components/Layout/Header';
// import Footer from '../../components/Footer';
// import Copyright from '../../components/Copyright';

import useStyles from './style';

function LandingPageLayout(props) {
  const classes = useStyles();
  const history = useHistory();
  const { children, auth } = props;

  if (auth.authenticated) {
    history.push('/dashboard');
  }

  return (
    <div className={clsx('landing-page-layout', classes.login_container)}>
      <Grid container>
        <Grid item xs={12} md={6} className={classes.left__side}>
          <Header />
          {children}

          {/* <Copyright /> */}
        </Grid>
        <Hidden smDown>
          <Grid item md={6} className={classes.right__side}>
            <div className={classes.meal__img_container}>
              {/* <img
                className={classes.meal__img}
                src="https://mcd-smart-request.s3.us-east-2.amazonaws.com/smart-request-image-cdn/Chicken-McNugget-Happy-Meal.png"
                // src="https://mcd-smart-request.s3.us-east-2.amazonaws.com/smart-request-image-cdn/80_Chicken-McNugget-Happy-Meal-002-2.png"
                alt="Mcdonald's Happy Meal"
              /> */}
            </div>
            <div className={classes.footer__nav_container}>
              {/* <Footer /> */}
            </div>
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

LandingPageLayout.defaultProps = {
  children: null,
};

LandingPageLayout.propTypes = {
  children: PropTypes.node,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(LandingPageLayout);
