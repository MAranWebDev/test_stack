import Box from '@mui/material/Box';
import { SampleCreateTrigger } from './sample-create-trigger';
import { SampleFilterForm } from './sample-filter-form';

export const SampleActionBar = () => {
  return (
    <Box sx={{ display: 'flex', gap: 1, p: 2 }}>
      <SampleFilterForm />
      <SampleCreateTrigger />
    </Box>
  );
};
