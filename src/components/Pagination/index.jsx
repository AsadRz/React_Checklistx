/* eslint-disable react/forbid-prop-types */
import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import NativeSelect from '@material-ui/core/NativeSelect';
import PropTypes from 'prop-types';

import useStyles from './style';

export default function PaginationWrapper(props) {
  const classes = useStyles();

  const {
    // canPreviousPage,
    // canNextPage,
    pageOptions,
    // pageCount,
    gotoPage,
    // nextPage,
    // previousPage,
    setPageSize,
    // pageIndex,
    pageSize,
  } = props;
  return (
    <div className={classes.pagination}>
      <Pagination
        count={pageOptions.length}
        shape="rounded"
        onChange={(e, page) => {
          gotoPage(page);
        }}
      />
      {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
      <span>
        Page{' '}
        <strong>
          {pageIndex + 1} of
          {pageOptions.length}
        </strong>{' '}
      </span> */}
      <NativeSelect
        className={classes.showOptions}
        disableUnderline
        name="filter"
        id="filter"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[20, 50, 100].map((size) => (
          <option className={classes.options} key={size} value={size}>
            {size}
          </option>
        ))}
      </NativeSelect>
    </div>
  );
}

PaginationWrapper.propTypes = {
  pageOptions: PropTypes.array.isRequired,
  gotoPage: PropTypes.func.isRequired,
  setPageSize: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};
