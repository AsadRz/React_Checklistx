/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash-es';
import matchSorter from 'match-sorter';
import clsx from 'clsx';
import DataTable from '../DataTable';
import Avatar from '../Avatar';
import useStyles from './style';

export default function UserList(props) {
  const classes = useStyles();
  const { users, loading } = props;
  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);

  const columns = [
    {
      Header: 'Name',
      Cell: ({ row }) => {
        let name = get(row, 'original.name', '');
        const email = get(row, 'original.email', '');
        name = isEqual(name, null) ? email.split('@')[0] : name;

        let displayPhoto = get(row, 'original.photo', '');

        displayPhoto = isEqual(displayPhoto, null) ? '' : displayPhoto;

        return (
          <div
            style={{
              height: 50,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',

              width: 200,
            }}
          >
            <span className={classes.align}>
              <Avatar displayPhoto={displayPhoto} displayName={name} small />
            </span>
            <div className={clsx(classes.text, classes.align)}>{name}</div>
          </div>
        );
      },
      minWidth: 64,
    },
    {
      Header: 'Email',
      Cell: ({ row }) => {
        let email = get(row, 'original.email', '');
        email = isEqual(email, null) ? '---' : email;

        return <div>{email}</div>;
      },
      minWidth: 100,
    },
    {
      Header: 'Role',
      Cell: ({ row }) => {
        let role = get(row, 'original.role_id', '');
        role = isEqual(role, null) ? '---' : role;

        return <div>{role}</div>;
      },
      minWidth: 100,
    },
    {
      Header: 'Category',
      Cell: ({ row }) => {
        let category = get(row, 'original.category_id', '');
        category = isEqual(category, null) ? '---' : category;

        return <div>{category}</div>;
      },
      minWidth: 100,
    },
  ];

  const record = matchSorter(users, searchValue.toLocaleLowerCase(), {
    keys: ['name', 'email', 'role_id', 'category_id'],
  });

  return (
    <DataTable
      columns={columns}
      data={record}
      loading={loading}
      placeholder="Search for a User"
      searchValue={searchValue}
      onSearch={onSearch}
      showPaper
    />
  );
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
