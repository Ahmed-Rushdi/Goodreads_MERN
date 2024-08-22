import { useState } from 'react';
import '../styles/user-book.css';
import BasicModal from './dropdownMenu';
import BasicRating from './NoRating';
import ReadMore from './ReadMore';
import Rating from './Rating';
import Button from '@mui/material/Button';

const UserBook = ({ books }) => {
    const [shelfState, setShelfState] = useState(() => {
        const initialState = {};
        books.forEach(bookObj => {
            initialState[bookObj.book.isbn13] = bookObj.shelf;
        });
        return initialState;
    });

    const [bookList, setBookList] = useState(books); // Use state to manage the list of books

    const updateShelf = (isbn, newShelf) => {
        setShelfState(prevState => ({
            ...prevState,
            [isbn]: newShelf,
        }));

        // If the book is removed from the shelf, remove it from the list
        if (!newShelf) {
            setBookList(prevList => prevList.filter(bookObj => bookObj.book.isbn13 !== isbn));
        }
    };

    return (
        <div>
            <h1>User Books:</h1>
            <ul>
                {bookList.map((bookObj) => {
                    const book = bookObj.book;
                    const author = book.authorId;
                    const categories = book.categories || [];
                    const currentShelf = shelfState[book.isbn13];

                    return (
                        <li className='user-book' key={book.isbn13 || Math.random().toString()}>
                            <div className="book-image">
                                <img src={book.thumbnail || "default-thumbnail.jpg"} alt={`${book.title} thumbnail`} />
                                <div className="book-shelf">
                                    <BasicModal
                                        isbn={book.isbn13}
                                        shelf={currentShelf}
                                        onShelfChange={updateShelf} // Pass the update function to BasicModal
                                    />
                                </div>
                            </div>
                            <div className="book-info">
                                <div className="book-header-info">
                                    <h2>{book.title || 'Title not available'}</h2>
                                    <p>by {author ? author.name : 'Author not available'}</p>
                                    <div className='rating'>
                                        <p>{book.rating?.toFixed(2) || 'N/A'}</p>
                                        <BasicRating rating={book.rating || 0} />
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
                                    <p>Genres: {categories.map(cat => cat.name).join(', ') || 'Categories not available'}</p>
                                    <p>Page Count: {book.pageCount || 'Page count not available'}</p>
                                    <p>Shelf: {currentShelf}</p>
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
                    );
                })}
            </ul>
        </div>
    );
};

export default UserBook;
