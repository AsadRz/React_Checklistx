import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: 20,
    borderRadius: 6,
    minWidth: 400,
  },
  alreadyExist: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.common.red,
    visibility: 'hidden',
  },
  hideAlreadyExist: {
    visibility: 'visible',
  },
}));

export default useStyles;
