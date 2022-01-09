import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { theme } from '../../themes/theme';

const AuthButton = styled(Button)<ButtonProps>(() => ({
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default AuthButton;
