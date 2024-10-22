import { MainHeader } from '@/components/headers/main-header';
import Box from '@mui/material/Box';
import { PropsWithChildren } from 'react';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MainHeader />
      <Box sx={{ width: '90%', mx: 'auto', pb: 5 }} component="main">
        {children}
      </Box>
    </>
  );
};
