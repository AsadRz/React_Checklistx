import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  pagination: {
    marginTop: 8,
    padding: 8,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    '& .Mui-selected': {
      background: theme.palette.common.blue,
      color: theme.palette.common.white,
      '&:hover': {
        background: theme.palette.common.blue,
        color: theme.palette.common.white,
      },
    },
  },
  showOptions: {
    border: '1px solid #E2E2EA',
    cursor: 'pointer',
    outline: 'none',
    padding: '1px 4px',
    fontSize: '0.875rem',
    height: '28px',
    background: '#ffffff',
    boxSizing: 'borderBox',
    marginRight: '8px',
    borderRadius: '6px',
    '& .MuiNativeSelect-select.MuiNativeSelect-select': {
      paddingRight: '8px',
      border: 'none',
    },
    '& .MuiNativeSelect-select:focus': {
      backgroundColor: 'transparent',
    },
  },
}));
