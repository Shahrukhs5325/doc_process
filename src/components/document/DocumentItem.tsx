// DocumentProcessing.jsx
import React from 'react';
import { Box, Card, Grid, Paper, Stack, Typography, styled } from '@mui/material';

type Props = {
};

const DocumentItem: React.FC<Props> = () => {


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
       <Item>xs=2</Item>
   );
};

export default DocumentItem;
