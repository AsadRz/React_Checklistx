/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useTable, usePagination } from 'react-table';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import useStyles from './style';
import Title from '../Title';
import Loader from '../Loader';
import Pagination from '../Pagination';
import SearchBar from '../SearchBar';

export default function DataTable(props) {
  const classes = useStyles();
  const {
    columns,
    data,
    loading,
    placeholder,
    onSearch,
    searchValue,
    showPaper,
  } = props;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,

    // pagination,
    // pageOptions,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },

    usePagination
  );

  return (
    <div>
      <Paper
        className={clsx(classes.paper, !showPaper && classes.transparentPaper)}
      >
        <SearchBar
          placeholder={placeholder}
          searchValue={searchValue}
          onSearch={onSearch}
        />
        <div className={classes.loaderContianer}>
          <Loader show={loading} size={50} />
        </div>

        {!loading && data.length !== 0 ? (
          <table className={classes.table} {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className={classes.columns}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column, i) => (
                    <th
                      className={clsx(i === 0 && classes.leftAlignCell)}
                      {...column.getHeaderProps()}
                    >
                      <Title text={column.render('Header')} size={14} />
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr className={classes.row} {...row.getRowProps()}>
                    {row.cells.map((cell, i) => {
                      return (
                        <td
                          className={clsx(
                            classes.cell,
                            i === 0 && classes.leftAlignCell
                          )}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
        {loading ? null : data.length === 0 ? null : (
          <>
            <Pagination
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              pageOptions={pageOptions}
              pageCount={pageCount}
              gotoPage={gotoPage}
              nextPage={nextPage}
              previousPage={previousPage}
              setPageSize={setPageSize}
              pageIndex={pageIndex}
              pageSize={pageSize}
            />
          </>
        )}
        {!loading && data.length === 0 ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Title text="No record available!" size={16} />
          </div>
        ) : null}
      </Paper>
    </div>
  );
}

DataTable.defaultProps = {
  searchValue: '',
  onSearch: () => {},
  showPaper: true,
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  placeholder: PropTypes.string.isRequired,
  showPaper: PropTypes.bool,
  onSearch: PropTypes.func,
  searchValue: PropTypes.string,
};
