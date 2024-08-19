
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const count = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        page={currentPage}
        onChange={handleChange}
        variant="outlined"
        shape="rounded"
        showFirstButton  // Correct prop for showing the first page button
        showLastButton   // Correct prop for showing the last page button
      />
    </Stack>
  );
}
