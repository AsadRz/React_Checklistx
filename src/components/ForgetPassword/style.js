import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  message_container: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    [theme.breakpoints.between(1280, 1496)]: {
      marginTop: theme.spacing(4),
    },
  },
  message: {
    marginLeft: theme.spacing(9),
    letterSpacing: '0.16px',
    // fontSize: '2rem',
    // fontWeight: 600,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.8rem',
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.8rem',
    },
  },
  login__form_container: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    marginTop: theme.spacing(7),
    [theme.breakpoints.between(1280, 1496)]: {
      marginTop: theme.spacing(5),
    },
  },
  login__form: {
    margin: '16px 72px',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
    },
  },
  login__form_field: {
    margin: '16px 0 16px 0',

    [theme.breakpoints.down('xs')]: {
      width: '78%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '78%',
    },
    [theme.breakpoints.up('md')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      width: '60%',
    },
  },
  label: {
    marginBottom: '4px',
  },
  rememberMe: {
    marginLeft: '2px',
  },
  forget_password: {
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  copyright__container: {
    position: 'absolute',
    bottom: 24,
    left: '110px',
  },
  copyright__icon: {
    fontSize: 'inherit !important;',
    marginRight: '2px',
    verticalAlign: 'middle',
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
  footer__nav_container: {},
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
  cancelBtn: {
    margin: theme.spacing(2),
  },
}));

export default useStyles;
