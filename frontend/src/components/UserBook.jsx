import '../styles/user-book.css';
import BasicModal from './dropdownMenu';
import BasicRating from './NoRating';
import ReadMore from './ReadMore';
import Rating from './Rating';
import Button from '@mui/material/Button';

const UserBook = ({ books }) => {
    return (
        <div>
            <h1>User Books:</h1>
            <ul>
                {books.map((book) => (
                    <li className='user-book' key={book.isbn13 || Math.random().toString()}>
                        <div className="book-image">
                            <img src={book.thumbnail} alt={`${book.title} thumbnail`} />
                            <div className="book-shelf">
                                <BasicModal />
                            </div>
                        </div>
                        <div className="book-info">
                            <div className="book-header-info">
                                <h2>{book.title || 'Title not available'}</h2>
                                <p>by {book.author || 'Author not available'}</p>
                                <div className='rating'>
                                    {/* Display the average rating */}
                                    <p>{book.rating?.toFixed(2) || 'N/A'}</p>
                                    {/* Render the star rating component */}
                                    <BasicRating rating={book.rating || 0} />
                                    {/* Display the total number of ratings */}
                                    <p>({book.totalRatings || 'No'} ratings)</p>
                                </div>
                            </div>
                            <br />
                            <div className="book-description-info">
                                <ReadMore text={book.description || 'Description is not available'} limit={100}/>
                            </div>
                            <br />
                            <div className="book-body-info">
                                <p>Published by: {book.publisher || 'Publisher not available'}</p>
                                <p>ISBN: {book.isbn13 || 'ISBN not available'}</p>
                                <p>Language: {book.language || 'Language not available'}</p>
                                <p>Genres: {book.categories?.join(', ') || 'Categories not available'}</p>
                                <p>Page Count: {book.pageCount || 'Page count not available'}</p>
                            </div>
                        </div>
                        <div className="book-review-rating">
                            <h2>Rate this Book</h2>
                            <Rating />
                            <Button>Rate</Button>
                            <h2>Review this Book</h2>
                            <textarea name="review" id="review" placeholder='Review this book...'></textarea>
                            <Button>Review</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserBook;
