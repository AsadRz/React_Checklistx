import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  login_container: {
    position: 'relative',
  },
  left__side: {
    backgroundColor: '#F8F6F7',
    height: '100vh',
    position: 'relative',
  },
  right__side: {
    backgroundColor: '#fff',
  },

  meal__img_container: {
    width: '45%',
    position: 'absolute',
    bottom: 0,
    right: '10%',
  },
  meal__img: {
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  footer__nav: {
    display: 'flex',
    listStyle: 'none',
    justifyContent: 'center',
    position: 'fixed',
    bottom: 0,
    right: '9%',
    '& li': {
      marginRight: theme.spacing(4),
      '&:hover': {
        cursor: 'pointer',
      },
    },
    [theme.breakpoints.down('md')]: {
      right: '7%',
    },
  },
}));

export default useStyles;
