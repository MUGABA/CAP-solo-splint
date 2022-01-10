import { Typography } from '@mui/material';
import useStyles from '../../pages/SignUp/useStyles';

interface Props {
  children: any;
}

function UserProfile(): JSX.Element {
  const classes = useStyles();
  return <Typography alignSelf="center">This is a Profile Page</Typography>;
}

export default UserProfile;
