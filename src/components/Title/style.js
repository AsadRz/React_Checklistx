import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  text: {
    fontSize: (props) => props.size,
    color: theme.palette.common.lighterBlack,
    fontWeight: '700',
  },
}));
