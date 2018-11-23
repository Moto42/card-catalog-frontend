import React from 'react';

function BookListing(props){
  const { showBookInfo, book } = props;
  const {title, authorFirst, authorLast, publishedYear, genre } = book;


  return (<tr onClick={ ()=>showBookInfo(book) } className = 'BookListing'>
    <td className='title'>{title}</td>
    <td className='author'>{`${authorFirst} ${authorLast}`}</td>
    <td className='year'>{publishedYear}</td>
    <td className='genre'>{genre}</td>
  </tr>)
}

export default BookListing;
