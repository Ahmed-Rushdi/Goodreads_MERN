import React, { useEffect } from 'react'
import { useFetchData } from '../../utils/DataFetching'
import PaginationRounded from '../BookPaging'
import { List } from "antd"
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

    // return {
    //     data,
    //     totalItems: count,
    //     currentPage: page,
    //     totalPages: Math.ceil(count / limit),
    //   };
  return (
    <div>
        {<h1>Books Page {page}</h1>}
        {error ? (
            <p style={{ color: "red" }}>{error.message}</p>
        ) : loading ? (
            <p>Loading...</p>
        ) : booksPage ? (<>
        
            <PaginationRounded totalItems={booksPage?.totalItems} itemsPerPage={limit} currentPage={page} onPageChange={setPage} />
            <List 
                dataSource={booksPage.data}
                renderItem={(item) => (
                    <List.Item>
                        {JSON.stringify(item)}
                    </List.Item>
                )} />
        </>
        ) : (
            <p>No books found</p>
        )}
    </div>
  )
}

export default BooksPanel