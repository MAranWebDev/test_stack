import { SampleProvider } from '@/features/sample/context';
import Stack from '@mui/material/Stack';
import { AddBox } from './AddBox';
import { SampleTable } from './SampleTable';

export const Sample = () => {
  return (
    <SampleProvider>
      <Stack sx={{ minWidth: 650 }} spacing={1}>
        <AddBox />
        <SampleTable />
      </Stack>
    </SampleProvider>
  );
};
