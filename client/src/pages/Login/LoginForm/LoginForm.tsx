import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthButton from '../../../components/ReusableComponents/AuthButtons';
import CustomInput from '../../../components/ReusableComponents/CustomTextField';
import useStyles from './useStyles';

interface Props {
  handleSubmit: (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    {
      setStatus,
      setSubmitting,
    }: FormikHelpers<{
      email: string;
      password: string;
    }>,
  ) => void;
}

export default function Login({ handleSubmit }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
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
          <Typography variant="h4" sx={{ textAlign: 'center' }}>
            Login
          </Typography>
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
            placeholder="Your password"
            handleChange={handleChange}
          />
          <Box textAlign="center" marginTop={1}>
            <AuthButton type="submit" size="large" className={classes.submit}>
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Login'}
            </AuthButton>
          </Box>
        </form>
      )}
    </Formik>
  );
}
