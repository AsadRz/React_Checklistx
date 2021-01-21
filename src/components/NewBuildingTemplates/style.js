import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    textType: {
        paddingLeft: 24
    },
    paper: {
        padding: 20,
        borderRadius: 6,
        margin: 20,
        display: 'inline-flex',
        minWidth: 200,
        justifyContent: 'center',
        textAlign: 'center'
    },
}));

export default useStyles;
