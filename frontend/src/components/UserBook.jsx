import '../styles/user-book.css'
import BasicMenu from './dropdownMenu';

const UserBook = ({ books }) => {
    return (
        <div>
            <h1>User Books:</h1>
            <ul>
                {books.map((book) => (
                    <li className='user-book' key={book.isbn13 || Math.random().toString()}>
                            <div className="book-image">
                                <img src='https://placehold.co/600x400' alt={`${book.title} thumbnail`} />
                            </div>
                            <div className="book-info">
                                <h3>{book.title || 'Title not available'}</h3>
                                <p>by {book.author || 'Author not available'}</p>
                                <p>Published by: {book.publisher || 'Publisher not available'} on {new Date(book.publishedDate).toDateString() || 'Publish date not available'} </p>
                                <br />
                                <p>ISBN: {book.isbn13 || 'ISBN is not Available'}</p>
                                <p>Description: {book.description || 'Description not available'}</p>
                                <p>Language: {book.language || 'Language not available'}</p>
                                <p>Genres: {book.categories?.join(', ') || 'Categories not available'}</p>
                                <p>Page Count: {book.pageCount || 'Page count not available'}</p>
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
