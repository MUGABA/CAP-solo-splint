import Button, { ButtonProps } from '@mui/material/Button';
import { purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

const RequiredButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: '#f14140',
  '&:hover': {
    backgroundColor: '#f14140',
  },
}));

export default RequiredButton;
