import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import '../styles/user-shelf.css';

const UserShelf = () => {
    return (
        <div className="book-status">
            <h1>User Book Shelves: </h1>
            <Stack direction="row" spacing={2}>
            <Button>Read</Button>
            <Button>Want to Read</Button>
            <Button>Currently Reading</Button>
            </Stack>
        </div>
    );
}
 
export default UserShelf;