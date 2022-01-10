import { Container, Paper } from '@mui/material';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import SideBar from '../../components/SideBar/SideBar';
import UserProfile from '../../components/UserProfile/UserProfile';
import { useAuth } from '../../context/useAuthContext';
import Login from '../../pages/Login/Login';
import Signup from '../../pages/SignUp/SignUp';
import Dashboard from '../Dashboard/Dashboard';

function AuthLayout() {
  const { loggedInUser: user } = useAuth();
  return (
    <>
      {!user ? (
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      ) : (
        <>
          <Navbar />
          <Container sx={{ marginTop: '30px' }}>
            <Stack direction="row" spacing={6}>
              <SideBar />
              <Paper>
                <Switch>
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/profile" component={UserProfile} />
                  {/* <Redirect to="/login" /> */}
                </Switch>
              </Paper>
            </Stack>
          </Container>
        </>
      )}
    </>
  );
}

export default AuthLayout;
