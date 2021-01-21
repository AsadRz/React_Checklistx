import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  logo__title__container: {
    margin: theme.spacing(4, 4, 1, 4),
    display: 'flex',
  },
  logo__container: {
    width: '160px',
    height: '120px',
  },
  logo_img: {
    width: '100%',
  },
}));

export default useStyles;
