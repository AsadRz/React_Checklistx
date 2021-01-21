/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

import useStyles from './style';

function MainLayout({ children, width, auth }) {
  const classes = useStyles();
  const history = useHistory();
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const updateViewState = () => {
    if (drawerOpen && width === 'xs') {
      handleDrawerToggle();
    } else if (!drawerOpen && width === 'sm') {
      handleDrawerToggle();
    }
  };

  useEffect(() => {
    updateViewState();
  }, [width]);

  if (!auth.authenticated) {
    history.push('/');
  }

  return (
    <div className={classes.root}>
      <Header handleDrawerToggle={handleDrawerToggle} />

      <Sidebar
        drawerOpen={drawerOpen}
        handleDrawerToggle={handleDrawerToggle}
      />

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpen,
        })}
      >
        {/* necessary for content to be below app bar */}
        <div className={classes.toolbar} />
        <Container maxWidth="xl" className={classes.mainContent}>
          {children}
        </Container>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  auth: PropTypes.object.isRequired,
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default connect(mapStateToProps, null)(withWidth()(MainLayout));
