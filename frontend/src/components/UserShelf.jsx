import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../styles/user-shelf.css';

const UserShelf = ({ setSelectedShelf }) => {

  const handleShelfClick = (shelf) => {
    setSelectedShelf(shelf);
  };

  return (
    <div className="book-status">
      <h1>User Book Shelves: </h1>
      <Stack direction="row" spacing={2}>
        <Button onClick={() => handleShelfClick('read')}>Read</Button>
        <Button onClick={() => handleShelfClick('wantToRead')}>Want to Read</Button>
        <Button onClick={() => handleShelfClick('currentlyReading')}>Currently Reading</Button>
      </Stack>
    </div>
  );
};

export default UserShelf;
