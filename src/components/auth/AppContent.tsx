import React from 'react';
import { BaseProps } from '../../@types/common';
import Navbar from '../nav/Navbar';
import Sidebar from '../sidebar/Sidebar';
//import { getCurrentUser } from 'aws-amplify/auth';

import { Box, Typography } from '@mui/material';

type Props = BaseProps & {
  signOut?: () => void;
};


const AppContent: React.FC<Props> = () => {


  // useEffect(() => {
  //   fetchAuthSession().then((session) => {
  //     console.log('Session', session);
  //   });
  // }, []);

  return (

    <Box>
      <Navbar/>
      <Box className=''>
        <Box height={180} className='bg-theme-color px-10 pt-4'>
          <Typography color={"white"} variant="h5">Intelligent Document Processing</Typography>
        </Box>
        <Box>
          <Sidebar />
        </Box>
      </Box>
    </Box>
  );
};

export default AppContent;
