import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Link } from 'react-router-dom';

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
  const [isActive, setActive] = useState(false);
  return (
    <Paper>
      <MenuList>
        {links.map((link, index) => (
          <MenuItem key={index} selected={isActive}>
            {link}
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
}

export default SideBar;
