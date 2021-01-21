import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  paper: {
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  paddingLeft: {
    paddingLeft: theme.spacing(2),
  },
}));
