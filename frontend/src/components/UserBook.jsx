import '../styles/user-book.css'
import BasicMenu from './dropdownMenu';
import BasicRating from './NoRating';

const UserBook = ({ books }) => {
    return (
        <div>
            <h1>User Books:</h1>
            <ul>
                {books.map((book) => (
                    <li className='user-book' key={book.isbn13 || Math.random().toString()}>
                            <div className="book-image">
                                <img src='https://placehold.co/400x600' alt={`${book.title} thumbnail`} />
                            </div>
                            <div className="book-info">
                                <h2>{book.title || 'Title not available'}</h2>
                                <p>by {book.author || 'Author not available'}</p>
                                <div className='rating'>
                                    <p>{book.rating}</p>
                                     <BasicRating rating={book.rating || 0} />
                                </div>
                                <p>Published by: {book.publisher || 'Publisher not available'}</p>
                                <p>ISBN: {book.isbn13 || 'ISBN is not Available'}</p>
                                <p>Language: {book.language || 'Language not available'}</p>
                                <p>Genres: {book.categories?.join(', ') || 'Categories not available'}</p>
                                <p>Page Count: {book.pageCount || 'Page count not available'}</p>
                                
                                {/* Pass the rating to the BasicRating component */}

                            </div>
                            <div className="book-shelf">
                                <BasicMenu />
                            </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserBook;
