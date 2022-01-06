import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import CustomizedInput from '../../../components/ReUsableComponents/CustomTextField';
import RequiredButton from '../../../components/ReUsableComponents/RequiredButton';
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
          <Box textAlign="center" marginTop={5}>
            <h1>Sign Up</h1>
          </Box>
          <CustomizedInput
            id="email"
            name="email"
            placeholder="Email here"
            value={values.email}
            handleChange={handleChange}
            label="Email"
            classes={classes}
            type="text"
            errors={errors}
            touched={touched}
          />
          <CustomizedInput
            id="username"
            name="username"
            placeholder="Name here"
            value={values.username}
            handleChange={handleChange}
            label="Username"
            classes={classes}
            type="text"
            errors={errors}
            touched={touched}
          />
          <CustomizedInput
            id="password"
            name="password"
            placeholder="Password here"
            value={values.password}
            handleChange={handleChange}
            label="Password"
            classes={classes}
            type="password"
            errors={errors}
            touched={touched}
          />
          <Box textAlign="center" marginTop={5}>
            <RequiredButton type="submit" size="medium" variant="contained" color="primary" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'SIGH UP'}
            </RequiredButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default SignUpForm;
