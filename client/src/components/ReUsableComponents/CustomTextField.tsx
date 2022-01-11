import Box from '@mui/material/Box/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import * as React from 'react';

interface Props {
  id: string;
  value: string;
  name: string;
  label: string;
  handleChange: any;
  classes: any;
  placeholder: string;
  type: string;
  errors: any;
  touched: any;
}

const CustomInput = ({
  id,
  name,
  value,
  label,
  handleChange,
  classes,
  placeholder,
  type,
  errors,
  touched,
  ...otherProps
}: Props): JSX.Element => {
  return (
    <Box style={{ margin: '10px' }}>
      <InputLabel shrink={false}>{label}</InputLabel>
      <FormControl fullWidth>
        <TextField
          id={id}
          fullWidth
          placeholder={placeholder}
          name={name}
          autoFocus
          type={type}
          value={value}
          classes={classes}
          autoComplete="current-password"
          {...otherProps}
          onChange={handleChange}
          helperText={touched.name ? errors.email : ''}
          error={touched.name && Boolean(errors.email)}
        />
      </FormControl>
    </Box>
  );
};

export default CustomInput;
