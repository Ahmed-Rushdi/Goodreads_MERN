import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import '../styles/user-book.css';

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className='shelf-drop'>
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
          <Button>Read</Button>
          <Button>Currently Reading</Button>
          <Button>Want to Read</Button>
          <Button 
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
