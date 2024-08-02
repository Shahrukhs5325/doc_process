import React from 'react';
import { signOut } from "aws-amplify/auth"
import { Avatar, IconButton, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
import logo from '../../assets/brand-logo..png';
import { useNavigate } from 'react-router-dom';

type Props = {
};

const Navbar: React.FC<Props> = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const signOutHandler = async () => {
    await signOut()
  }

  return (

    <Stack className='bg-theme-color fixed-navbar' >
      <Stack direction={"row"} justifyContent={"space-between"} sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', px: 4, py: 1 }}>
        {/* <Typography color={"white"} variant='h5'>ActiveGen.ai</Typography> */}
        <div onClick={() => navigate("/")}>
          <img src={logo} width="200" />
        </div>

        <Tooltip title="Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={signOutHandler}>
          <Avatar /> Logout
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider /> */}

      </Menu>
    </Stack>
  );
};

export default Navbar;
