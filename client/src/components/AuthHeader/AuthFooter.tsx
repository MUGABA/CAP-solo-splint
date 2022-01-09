import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  linkTo: string;
  asideText: string;
  btnText: string;
}

const AuthFooter = ({ linkTo, asideText, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={2} alignSelf="center" className={classes.boxStyle}>
      <Typography>
        {asideText}
        <Link to={`/${linkTo}`} className={classes.linkStyle}>
          {btnText}
        </Link>
      </Typography>
    </Box>
  );
};

export default AuthFooter;
