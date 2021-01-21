import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginLeft: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(18),
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: '6px',
    backgroundColor: theme.palette.common.lightWhite,
    '&:hover': {
      backgroundColor: theme.palette.common.lightWhite,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '32%',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(3),
      width: '24%',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.lightGrayish,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  info: {
    marginTop: '12px',
  },
  name: {
    fontSize: '0.875rem',
    fontWeight: '700',
    color: '#404040',
  },
  role: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#565656',
  },
  downArrowContainer: {
    marginTop: '24px',
    marginLeft: '24px',

    '& img:hover': {
      cursor: 'pointer',
    },
  },
}));
