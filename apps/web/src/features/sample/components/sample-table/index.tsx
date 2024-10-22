import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import { SampleTableBody } from './sample-table-body';
import { SampleTableFooter } from './sample-table-footer';
import { SampleTableHead } from './sample-table-head';

export const SampleTable = () => {
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer sx={{ height: 450 }}>
        <Table stickyHeader size="small">
          <SampleTableHead />
          <SampleTableBody />
        </Table>
      </TableContainer>
      <SampleTableFooter />
    </Paper>
  );
};