/* eslint-disable no-shadow */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import { connect } from 'react-redux';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Typography from '@material-ui/core/Typography';

import { setAuthFlag } from '../../store/auth';

import useStyles from './style';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    marginRight: -24,
    height: 44,
    marginLeft: 8,
    borderRadius: 6,
    position: 'relative',
    backgroundColor: theme.palette.common.lighteshWhite,

    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),

    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

function Sidebar(props) {
  const { window, drawerOpen, handleDrawerToggle, setAuthFlag } = props;
  const classes = useStyles();
  const history = useHistory();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const list1 = [
    {
      text: 'Dashboard',
      icon: '',
      link: '/dashboard',
    },
    {
      text: 'Tasks',
      icon: '',
      link: '/tasks',
    },
    {
      text: 'Buildings',
      icon: '',
      link: '/buildings',
    },
  ];

  const list2 = [
    {
      text: 'Template',
      icon: '',
      link: '/templates',
    },
    {
      text: 'Users',
      icon: '',
      link: '/users',
    },
    {
      text: 'Settings',
      icon: '',
      link: '/settings',
    },
  ];

  const options = ['123 North James Street'];

  async function handleLogout() {
    await Auth.signOut();

    setAuthFlag({ authenticated: false });

    history.push('/');
  }

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer
        className={classes.drawer}
        container={container}
        variant="persistent"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {/* necessary for content to be below app bar */}
        <div className={classes.toolbar} />

        <div className={classes.drawerContainer}>
          <FormControl variant="filled" className={classes.formControl}>
            <Select
              open={false}
              variant="filled"
              // native
              IconComponent={KeyboardArrowDownIcon}
              value={options[0]}
              onChange={() => {}}
              input={<BootstrapInput />}
              classes={{
                filled: classes.filled,
                icon: classes.icon,
                iconFilled: classes.iconFilled,
              }}
              renderValue={(text) => {
                if (text === null) return '';

                if (text.length > 15) {
                  return (
                    <>
                      <Typography className={classes.addressText}>
                        {text.substr(0, 15)}
                      </Typography>
                      <Typography className={classes.addressText}>
                        {text.substr(15, text.length)}
                      </Typography>
                    </>
                  );
                }

                return (
                  <Typography className={classes.addressText}>
                    {text}
                  </Typography>
                );
              }}
            >
              {options.map((val) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
              {/* <option value={1}></option> */}
            </Select>
          </FormControl>
          <List>
            {list1.map((item) => (
              <NavLink
                exact
                key={item.text}
                className={classes.link}
                activeClassName={classes.activeLink}
                to={item.link}
              >
                <ListItem button={false} className="linkText">
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                  <ListItemText primary={item.text} />
                </ListItem>
              </NavLink>
            ))}
          </List>
          <Divider />
          <List>
            {list2.map((item) => (
              <NavLink
                exact
                key={item.text}
                className={classes.link}
                activeClassName={classes.activeLink}
                to={item.link}
              >
                <ListItem button={false} className="linkText">
                  {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                  <ListItemText primary={item.text} />
                </ListItem>
              </NavLink>
            ))}
            <div
              className={clsx(classes.link, classes.logoutLink)}
              onClick={handleLogout}
            >
              <ListItem button={false} className="linkText">
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </List>
        </div>
      </Drawer>
    </nav>
  );
}

Sidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  drawerOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  setAuthFlag: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthFlag: (payload) => {
      dispatch(setAuthFlag(payload));
    },
  };
};

export default connect(null, mapDispatchToProps)(Sidebar);
