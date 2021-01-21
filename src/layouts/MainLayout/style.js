import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    overflowX: 'hidden',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },

  // necessary for content to be below app bar
  toolbar: { ...theme.mixins.toolbar},
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginLeft: 240,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  mainContent:{
    marginTop:'30px',
  }
}));