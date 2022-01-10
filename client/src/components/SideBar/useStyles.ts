import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  text: {
    '& a': {
      textDecoration: 'none',
      opacity: '0.7',
      color: 'black',
    },
    color: 'black',
  },
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: '#000000',
    fontWeight: 700,
  },
}));

export default useStyles;
