import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const count = Math.ceil(totalItems / itemsPerPage);
  console.log(totalItems);

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
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}
