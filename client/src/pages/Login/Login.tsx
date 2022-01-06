import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import useStyles from './useStyles';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={12} elevation={6} component={Paper} square>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          flexDirection="column"
          className={classes.authWrapper}
        >
          {/* <AuthHeader linkTo="/signup" asideText="Don't have an account?" btnText="Create account" /> */}
          <Box width="100%" maxWidth={450} p={3} alignSelf="center" elevation={6} component={Paper} square>
            <LoginForm handleSubmit={handleSubmit} />
            <Box p={2} alignSelf="center" style={{ textAlign: 'center' }}>
              <span>I dont have an Account? </span>
              <Link to="/signup" style={{ display: 'inline', color: '#f14140' }}>
                sign up
              </Link>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
