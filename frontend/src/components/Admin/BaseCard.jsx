// import React from 'react'
// import 
const BaseCard = ({ children , formRef, key, endPoint}) => {
  
    const handleEdit = () => {
        // retrieve form data from end point and assign its values to the form
        console.log("edit")
    }
    const handleDelete = () => {
        // call the delete on endpoint with the key
        console.log("delete")
    }
    return (
    <div className="flex flex-col rounded-md shadow-sm hover:shadow-md w-fit p-3 sm:flex sm:flex-row min-h-40 max-w-prose">
       {children}
        <hr />
        <div className='flex flex-row ml-2 text-buff'>
            <div className='space-x-4'>
            <button className="hover:underline" onClick={handleEdit}>Edit</button>
            <button className="hover:underline" onClick={handleDelete}>Delete</button>
            </div>
        </div>
        </div>
  )
}

export default BaseCard