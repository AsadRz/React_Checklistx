import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '24px 16px',
    minWidth: '100px',
    width: '100%',
    height: '100%',
    overflow: 'auto',
    borderRadius: 6,
    position: 'relative',
  },
  transparentPaper: {
    boxShadow: 'none',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    '& th:last-child': {
      borderRadius: '0 10px 10px 0',
    },
    '& th:first-child': {
      borderRadius: '10px 0 0 10px',
    },
  },

  columns: {
    backgroundColor: '#fafafb',
    color: '#92929d',
    fontSize: '0.75rem',

    '& th': {
      padding: 8,
    },
  },

  cell: {
    borderCollapse: 'collapse',
    padding: 8,
    textAlign: 'center',
  },
  leftAlignCell: {
    textAlign: 'left',
  
  },
  row: {
    fontSize: '0.875rem',
    color: '#44444f',
    marginTop: 8,
    padding: 8,
  },
  loaderContianer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
