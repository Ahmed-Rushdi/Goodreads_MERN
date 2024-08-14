import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const UserShelf = () => {
    return (
        <div className="book-status">
            {/* <ul>
                <li><button variant="text" color="default">
                  Read
                </button></li>
                <li><button variant="text" color="default">
                  Currently Reading
                </button></li>
                <li><button variant="text" color="default">
                  Want to Read
                </button></li>
            </ul> */}
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