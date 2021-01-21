import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  textType: {
    paddingLeft: 24,
  },
  paper: {
    padding: 20,
    borderRadius: 6,
    margin: 20,
    display: 'inline-flex',
    minWidth: 400,
    justifyContent: 'center',
  },
  dialogContent: {
    padding: '3px 24px',
  },
}));

export default useStyles;
