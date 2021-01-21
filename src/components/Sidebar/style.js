import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: { ...theme.mixins.toolbar },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
    maxWidth: 180,
    whiteSpace: 'pre-line',
    borderRadius: 6,
    marginLeft: 16,
    // marginRight: 16,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    borderLeftStyle: 'solid',
    borderLeftWidth: '4px',
    borderLeftColor: theme.palette.common.white,

    '& .linkText': {
      borderRadius: 6,
      marginLeft: 16,
      marginRight: 16,
    },
  },
  activeLink: {
    borderLeftColor: theme.palette.common.blue,

    '& .linkText': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.common.blue,
    },
  },
  filled: {
    paddingRight: '12px !important',
  },
  icon: {},
  iconFilled: {
    right: -16,
  },
  addressText: {
    fontSize: '1rem',
    color: theme.palette.common.lighterBlack,
  },
  logoutLink: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));
