import React from 'react';

function BookListing(props){
  return (<tr>
    <td className='title'>{props.book.title}</td>
    <td className='author'>{`${props.book.authorFirst} ${props.book.authorLast}`}</td>
    <td className='year'>{props.book.publishedYear}</td>
    <td className='genre'>{props.book.genre}</td>
  </tr>)
}

export default BookListing;
