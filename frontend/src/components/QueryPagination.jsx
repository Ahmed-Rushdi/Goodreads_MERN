import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function QueryPagination({ totalItems, itemsPerPage }) {
  const history = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const count = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    searchParams.set("page", value);
    history({ search: searchParams.toString() });
  };

  return (
    <Stack spacing={2} className="mt-4">
      <Pagination
        count={count}
        page={currentPage}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Stack>
  );
}

export default QueryPagination;
