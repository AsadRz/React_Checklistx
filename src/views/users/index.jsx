import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Title from '../../components/Title';
import { Button } from '../../components/Form';

import UserList from '../../components/UserList';
import { UserService } from '../../services';

import styles from './style';
import NewUserForm from '../../components/NewUserForm';

class Users extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      fetchingUsers: false,
      open: false,
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = async () => {
    try {
      this.setState({ fetchingUsers: true });

      const { data, status } = await UserService.getUsers();

      this.setState({ fetchingUsers: false, users: data });
    } catch (error) {
      this.setState({ fetchingUsers: false });
    }
  };

  handleClose = () => {
    this.setState((prevState) => {
      return {
        open: !prevState.open,
      };
    });
  };

  render() {
    const { fetchingUsers, users, open } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.titleContainer}>
          <Title text="Users" />
          <Button handleClick={this.handleClose} label="Add User" valid />
        </div>
        <UserList loading={fetchingUsers} users={users} />
        <NewUserForm
          open={open}
          handleClose={this.handleClose}
          refetch={this.fetchUsers}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Users);
