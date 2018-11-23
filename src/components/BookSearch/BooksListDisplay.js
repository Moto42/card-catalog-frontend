import React from 'react';
import BookListing from './BookListing';

function BooksListDisplay(props) {
  const listings = props.booksList.map(b=><BookListing book={b} showBookInfo={props.showBookInfo}/>)
  return(
    <table className="bookListingTable" id='BooksListDisplay'>
      <tr>
        <td className='title tableHeading'>Title</td>
        <td className='author tableHeading'>Author</td>
        <td className='year tableHeading'>Year</td>
        <td className='genre tableHeading'>Genre</td>
      </tr>
      {listings}
    </table>
  )
}

export default BooksListDisplay;
