/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash-es';
import matchSorter from 'match-sorter';

import DataTable from '../DataTable';

export default function TaskList(props) {
  const { tasks, loading } = props;

  const [searchValue, setSearchValue] = useState('');
  const onSearch = (value) => setSearchValue(value);

  const columns = [
    {
      Header: 'Title',
      Cell: ({ row }) => {
        let title = get(row, 'original.title', '');
        title = isEqual(title, null) ? '---' : title;

        return <div>{title}</div>;
      },
      minWidth: 100,
      filter: 'fuzzyText',
    },
    {
      Header: 'Program',
      Cell: ({ row }) => {
        let program = get(row, 'original.program', '');
        program = isEqual(program, null) ? '---' : program.split(':')[1].trim();

        return <div>{program}</div>;
      },

      minWidth: 100,
    },
    {
      Header: 'Type',
      Cell: ({ row }) => {
        let type = get(row, 'original.type', '');
        type = isEqual(type, null) ? '---' : type.split(':')[1].trim();

        return <div>{type}</div>;
      },

      minWidth: 100,
    },
    {
      Header: 'Priority',
      Cell: ({ row }) => {
        let prioratization = get(row, 'original.prioratization', '');
        prioratization = isEqual(prioratization, null)
          ? '---'
          : prioratization.split('/')[1].trim();

        return <div>{prioratization}</div>;
      },

      minWidth: 100,
    },
  ];

  const record = matchSorter(tasks, searchValue.toLocaleLowerCase(), {
    keys: ['title', 'program', 'type', 'prioratization'],
  });

  return (
    <DataTable
      columns={columns}
      data={record}
      loading={loading}
      placeholder="Search for a task"
      searchValue={searchValue}
      onSearch={onSearch}
      showPaper
    />
  );
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  loading: PropTypes.bool,
};
