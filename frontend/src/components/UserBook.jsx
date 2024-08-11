import '../styles/user-book.css'
const UserBook = ({ books }) => {
    return (
        <div>
            <h1>User Books:</h1>
            <ul>
                {books.map((book) => (
                    <li className='user-book' key={book.isbn13 || Math.random().toString()}>
                        <h3>{book.title || 'Title not available'}</h3>
                        <img src={book.thumbnail || 'https://example.com/default-thumbnail.jpg'} alt={`${book.title} thumbnail`} />
                        <p>Author: {book.author || 'Author not available'}</p>
                        <p>Description: {book.description || 'Description not available'}</p>
                        <p>Publisher: {book.publisher || 'Publisher not available'}</p>
                        <p>Published Date: {new Date(book.publishedDate).toDateString() || 'Publish date not available'}</p>
                        <p>Language: {book.language || 'Language not available'}</p>
                        <p>Categories: {book.categories?.join(', ') || 'Categories not available'}</p>
                        <p>Page Count: {book.pageCount || 'Page count not available'}</p>
                        <h4>Reviews:</h4>
                        {book.reviews && book.reviews.length > 0 ? (
                            <ul>
                                {book.reviews.map((review, index) => (
                                    <li key={index}>
                                        <p><strong>{review.user}:</strong> {review.comment}</p>
                                        <p>Rating: {review.rating} / 5</p>
                                        <p>Date: {new Date(review.date).toDateString()}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No reviews available</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserBook;
