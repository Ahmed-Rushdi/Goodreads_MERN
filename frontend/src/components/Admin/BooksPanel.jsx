import React, { useEffect } from 'react'
import { useFetchData } from '../../utils/DataFetching'
import PaginationRounded from '../BookPaging'
// const books = [...Array(10)].map((_, i) => ({
//   isbn13: `isbn13${i}`,
//   title: `Title ${i}`,
//   author: `Author ${i}`,
//   categories: [...Array(i)].map((_, j) => `Cat ${j}`),
//   thumbnail: `https://via.placeholder.com/150`,
// }))



const BooksPanel = () => {
    const [page, setPage] = React.useState(1)
    const [limit , setLimit] = React.useState(3)
    const { data: booksPage , loading, error } = useFetchData(`/api/books?page=${page}&limit=${limit}`)
    console.log(booksPage)


  return (
    <div>
        <h1>Books Page {page}</h1>
        <PaginationRounded totalItems={booksPage?.total} itemsPerPage={limit} currentPage={page} onPageChange={setPage} />
        {error ? (
            <p style={{ color: "red" }}>{error.message}</p>
        ) : loading ? (
            <p>Loading...</p>
        ) : booksPage ? (
            <ul>
                {booksPage.data.map((book) => (
                    <li key={book.isbn13}>{book.title}</li>
                ))}
            </ul>
        ) : (
            <p>No books found</p>
        )}
    </div>
  )
}

export default BooksPanel