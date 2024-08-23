import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import "../styles/user-shelf.css";

const shelves = [
  { label: "All", value: "" },
  { label: "Read", value: "read" },
  { label: "Want to Read", value: "wantToRead" },
  { label: "Currently Reading", value: "currentlyReading" },
];

const UserShelf = ({ setSelectedShelf, currentShelf }) => {
  const handleShelfClick = (shelf) => {
    setSelectedShelf(shelf);
  };

  return (
    <div className="book-status">
      <h1>User Book Shelves: </h1>
      <Stack direction="row" spacing={2}>
        {shelves.map((shelf) => (
          <Button
            key={shelf.value}
            onClick={() => handleShelfClick(shelf.value)}
            variant={currentShelf === shelf.value ? "contained" : "outlined"}
            color="primary"
          >
            {shelf.label}
          </Button>
        ))}
      </Stack>
    </div>
  );
};

export default UserShelf;
