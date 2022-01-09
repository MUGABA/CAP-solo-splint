import { Box, Grid, Paper } from '@mui/material';
import useStyles from '../../pages/SignUp/useStyles';

interface Props {
  children: any;
}

function AuthWrapper({ children }: Props): JSX.Element {
  const classes = useStyles();
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
          <Box width="100%" maxWidth={450} p={3} alignSelf="center" elevation={6} component={Paper} square>
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AuthWrapper;
