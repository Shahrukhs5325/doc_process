import React from 'react';
import { BaseProps } from '../../@types/common';
import Navbar from '../nav/Navbar';
//import { getCurrentUser } from 'aws-amplify/auth';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

type Props = BaseProps & {
  signOut?: () => void;
};


const Layout: React.FC<Props> = () => {



  return (

    <Box>

      <Navbar />
      <Outlet />

    </Box>
  );
};

export default Layout;
