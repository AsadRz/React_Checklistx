import React from 'react';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';

import useStyles from './style';

export default function SearchBar(props) {
  const classes = useStyles();
  const { placeholder, searchValue, onSearch } = props;

  return (
    <Grid xs={12} className={classes.search} item>
      <div className={classes.searchIcon}>
        <SearchIcon style={{ color: '#BCBBC2' }} />
      </div>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        value={searchValue}
        // onChange={(e) => onSearchChange(e.target.value)}
        onChange={(e) => {
          onSearch(e.target.value);
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Grid>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
};
