import {
  useReadSampleContext,
  useUpdateSampleContext,
} from '@/features/sample/context';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { ChangeEvent, MouseEvent } from 'react';

// Types
type ChangePageEventType = MouseEvent<HTMLButtonElement> | null;
type ChangeRowsPerPageEventType = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export const SamplePagination = () => {
  const { rowsPerPageOptions, dataCount, rowsPerPage, page } =
    useReadSampleContext();
  const { changePage, changeRowsPerPage } = useUpdateSampleContext();

  const handleChangePage = (_: ChangePageEventType, newPage: number) =>
    changePage(newPage);

  const handleChangeRowsPerPage = (event: ChangeRowsPerPageEventType) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    changeRowsPerPage(newRowsPerPage);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <TablePagination
        component="div"
        rowsPerPageOptions={rowsPerPageOptions}
        count={dataCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};