/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash-es';
import matchSorter from 'match-sorter';

import DataTable from '../DataTable';

import useStyles from './style';

export default function Buildings(props) {
  const { buildings, loading } = props;
  const classes = useStyles();

  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);

  const columns = [
    {
      Header: 'Name',
      Cell: ({ row }) => {
        let name = get(row, 'original.name', '');
        name = isEqual(name, null) ? '' : name;

        return <div className={classes.text}>{name}</div>;
      },

      minWidth: 100,
    },
    {
      Header: 'Street',
      Cell: ({ row }) => {
        let street = get(row, 'original.street', '');
        street = isEqual(street, null) ? '---' : street;

        return <div className={classes.text}>{street}</div>;
      },

      minWidth: 100,
    },
    {
      Header: 'City',
      Cell: ({ row }) => {
        let city = get(row, 'original.city', '');
        city = isEqual(city, null) ? '---' : city;

        return <div className={classes.text}>{city}</div>;
      },

      minWidth: 100,
    },
    {
      Header: 'State',
      Cell: ({ row }) => {
        let state = get(row, 'original.state', '');
        state = isEqual(state, null) ? '---' : state;

        return <div className={classes.text}>{state}</div>;
      },

      minWidth: 100,
    },
    {
      Header: 'Zip',
      Cell: ({ row }) => {
        let zip = get(row, 'original.zip', '');
        zip = isEqual(zip, null) ? '---' : zip;

        return <div>{zip}</div>;
      },

      minWidth: 100,
    },
    {
      Header: 'Floors',
      Cell: ({ row }) => {
        let floors = get(row, 'original.floors', '');
        floors = isEqual(floors, null) ? '---' : floors;

        return <div>{floors}</div>;
      },

      minWidth: 100,
    },
    {
      Header: 'Other Floors',
      Cell: ({ row }) => {
        let otherFloors = get(row, 'original.other_floors', '');
        otherFloors = isEqual(otherFloors, null) ? '---' : otherFloors;

        return <div>{otherFloors}</div>;
      },

      minWidth: 100,
    },
  ];

  const record = matchSorter(buildings, searchValue.toLocaleLowerCase(), {
    keys: ['name', 'street', 'state', 'city', 'zip', 'floors'],
  });

  return (
    <DataTable
      columns={columns}
      data={record}
      loading={loading}
      placeholder="Search for a building"
      searchValue={searchValue}
      onSearch={onSearch}
      showPaper
    />
  );
}

Buildings.propTypes = {
  buildings: PropTypes.array,
  loading: PropTypes.bool,
};
