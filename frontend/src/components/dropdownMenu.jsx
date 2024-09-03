import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import "../styles/user-book.css";

export default function BasicModal({ isbn, onShelfChange }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddToShelf = async (newShelf) => {
    try {
      const response = await axios.post(
        "https://goodreadsmern-production.up.railway.app/api/profile",
        { isbn, shelf: newShelf },
        {
          withCredentials: true,
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      );

      console.log("Book added to shelf:", response.data);
      onShelfChange(isbn, newShelf); // Update the shelf in the parent component
      handleClose();
    } catch (error) {
      console.error(
        "Error adding the book to the shelf:",
        error.message || error
      );
    }
  };

  const handleRemoveFromShelf = async () => {
    try {
      const response = await axios.post(
        "https://goodreadsmern-production.up.railway.app/api/profile",
        { isbn, shelf: null }, // Set shelf to null for removal
        {
          withCredentials: true,
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      );

      console.log("Book removed from shelf:", response.data);
      onShelfChange(isbn, null); // Clear the shelf in the parent component
      handleClose();
    } catch (error) {
      console.error(
        "Error removing the book from the shelf:",
        error.message || error
      );
    }
  };

  return (
    <div className="shelf-drop">
      <Button onClick={handleOpen}>Choose a Shelf</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="custom-modal-box">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Choose a shelf for this book...
          </Typography>
          <Button onClick={() => handleAddToShelf("read")}>Read</Button>
          <Button onClick={() => handleAddToShelf("currentlyReading")}>
            Currently Reading
          </Button>
          <Button onClick={() => handleAddToShelf("wantToRead")}>
            Want to Read
          </Button>
          <Button
            onClick={handleRemoveFromShelf}
            startIcon={<DeleteForeverIcon />}
            color="error"
            variant="contained"
          >
            Delete From My Shelf
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
