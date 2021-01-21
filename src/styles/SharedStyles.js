import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  topSpace: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2, 1),
    borderRadius: '6px',
  },
  tabIndicator: {
    backgroundColor: 'transparent',
  },
  tabOptions: {
    borderLeftWidth: 2,
    borderLeftStyle: 'solid',
    borderLeftColor: 'transparent',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  selectedTabOption: {
    borderLeftColor: theme.palette.common.blue,
    '&.MuiListItem-root.Mui-selected, .MuiListItem-root.Mui-selected:hover': {
      background: theme.palette.common.lightWhite,
    },
  },
}));
