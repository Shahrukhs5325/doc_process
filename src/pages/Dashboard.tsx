import React from 'react';
//import { getCurrentUser } from 'aws-amplify/auth';

import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DocumnetList from '../components/Steps/DocumnetList';

type Props = {

};


const Dashboard: React.FC<Props> = () => {
  const navigate = useNavigate();



  return (

    <Box>

      <Box className=''>
        <Stack height={60} direction={"row"} alignItems={"center"} justifyContent={"space-between"} className='bg-theme-color px-8'>
          <Typography color={"white"} variant="h5">Dashboard</Typography>

          <div className='cursor-pointer text-white ' onClick={() => navigate(`/upload_documents`)}>
            Upload New File
          </div>


        </Stack>
        <Box>
          <DocumnetList />
        </Box>
      </Box>

    </Box>
  );
};

export default Dashboard;
