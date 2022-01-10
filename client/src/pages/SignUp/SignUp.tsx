import { FormikHelpers } from 'formik';
import { default as AuthFooter } from '../../components/AuthHeader/AuthFooter';
import AuthWrapper from '../../components/ReusableComponents/AuthWrapper';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';

export default function Register(): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = async (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    await register(username, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
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
    <AuthWrapper>
      <SignUpForm handleSubmit={handleSubmit} />
      <AuthFooter linkTo="login" asideText="I already have an account" btnText="login" />
    </AuthWrapper>
  );
}
