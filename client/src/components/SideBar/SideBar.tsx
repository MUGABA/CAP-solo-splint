import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './useStyles';

const links = [
  <Link to="/dashboard" key={0}>
    Dashboard
  </Link>,
  <Link to="/profile" key={1}>
    Edit Profile
  </Link>,
  <Link to="" key={2}>
    Profile Photo
  </Link>,
  <Link to="" key={3}>
    Availability
  </Link>,
  <Link to="" key={4}>
    Payment
  </Link>,
  <Link to="" key={5}>
    Security
  </Link>,
  <Link to="" key={6}>
    Settings
  </Link>,
];

interface Props {
  children: any;
}

function SideBar() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <MenuList>
      {links.map((link, index) => (
        <MenuItem key={index} className={classes.text}>
          <Box component="span">{link}</Box>
        </MenuItem>
      ))}
    </MenuList>
  );
}

export default SideBar;
