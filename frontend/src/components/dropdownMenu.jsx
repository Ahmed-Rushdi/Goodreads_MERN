import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from 'axios';
import '../styles/user-book.css';

export default function BasicModal({ bookId }) {
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

const handleAddToShelf = async (shelf) => {
  try {
    console.log("Sending request to add book to shelf:", shelf);
    
    const response = await axios.post(
      'http://localhost:3000/api/profile',
      { bookId, shelf }, 
      { withCredentials: true } 
    );

    console.log("Book added to shelf:", response.data);
    handleClose();

  } catch (error) {
    console.error("Error adding the book to the shelf:", error.message || error);
  }
};


  const handleRemoveFromShelf = async () => {
    try {
      const response = await axios.delete(
        'http://localhost:3000/api/profile',
        {
          data: { bookId }, // Only bookId
          withCredentials: true // Include cookies in the request
        }
      );

      console.log("Book removed from shelf:", response.data);
      handleClose();
    } catch (error) {
      console.error("Error removing the book from the shelf:", error);
    }
  };

  return (
    <div className='shelf-drop'>
      <p>{shelf}</p>
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
          <Button onClick={() => handleAddToShelf('read')}>Read</Button>
          <Button onClick={() => handleAddToShelf('currentlyReading')}>Currently Reading</Button>
          <Button onClick={() => handleAddToShelf('wantToRead')}>Want to Read</Button>
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
