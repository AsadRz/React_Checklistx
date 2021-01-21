import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  search: {
    backgroundColor: theme.palette.common.lightWhite,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 6,
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      width: '100%',
    },
  },
  searchIcon: {
    width: theme.spacing(2),
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(2),
  },
  searchIcon_color: {
    color: 'black',
  },
  inputRoot: {
    color: 'inherit',
    display: 'contents',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    backgroundColor: theme.palette.common.lightWhite,
    width: '100%',
    borderRadius: 4,
    [theme.breakpoints.up('md')]: {
      padding: '12px 12px',
    },
  },
}));
