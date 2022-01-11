import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../../components/ReusableComponents/CustomTextField';
import RequiredButton from '../../../components/ReusableComponents/RequiredButtons';
import useStyles from './useStyles';

interface Props {
  handleSubmit: (
    {
      username,
      email,
      password,
    }: {
      email: string;
      password: string;
      username: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
      username: string;
    }>,
  ) => void;
}

const SignUpForm = ({ handleSubmit }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required').max(40, 'Username is too long'),
        email: Yup.string().required('Email is required').email('Email is not valid'),
        password: Yup.string()
          .required('Password is required')
          .max(100, 'Password is too long')
          .min(6, 'Password too short'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
          <CustomInput
            id="username"
            label="Username"
            name="username"
            type="text"
            value={values.username}
            classes={classes}
            errors={errors}
            touched={touched}
            placeholder="Your Username"
            handleChange={handleChange}
          />
          <CustomInput
            id="email"
            label="Email"
            name="email"
            type="text"
            value={values.email}
            classes={classes}
            errors={errors}
            touched={touched}
            placeholder="Your Email"
            handleChange={handleChange}
          />
          <CustomInput
            id="password"
            label="Password"
            name="password"
            type="password"
            value={values.password}
            classes={classes}
            errors={errors}
            touched={touched}
            placeholder="Your Password"
            handleChange={handleChange}
          />
          <Box textAlign="center" marginTop={5}>
            <RequiredButton type="submit" size="large" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SIGN UP'}
            </RequiredButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
