import React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "../styles/user-shelf.css";

const UserShelf = ({ selectedShelf, setSelectedShelf }) => {
  const handleShelfClick = (shelf, event) => {
    if (event) {
      event.preventDefault();
    }
    setSelectedShelf(shelf);
  };

  return (
    <div className="book-status">
      <h1>User Book Shelves: </h1>
      <Stack direction="row" spacing={2}>
        <Button
          onClick={(event) => handleShelfClick("", event)}
          className={selectedShelf === "" ? "active" : ""}
        >
          All
        </Button>
        <Button
          onClick={(event) => handleShelfClick("read", event)}
          className={selectedShelf === "read" ? "active" : ""}
        >
          Read
        </Button>
        <Button
          onClick={(event) => handleShelfClick("wantToRead", event)}
          className={selectedShelf === "wantToRead" ? "active" : ""}
        >
          Want to Read
        </Button>
        <Button
          onClick={(event) => handleShelfClick("currentlyReading", event)}
          className={selectedShelf === "currentlyReading" ? "active" : ""}
        >
          Currently Reading
        </Button>
      </Stack>
    </div>
  );
};

export default UserShelf;
