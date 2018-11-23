import React from 'react';

function BookEdit(props) {
  const {
    title = 'untitled',
    authorFirst,
    authorLast,
    publisher,
    publishedYear,
    upc,
    isbn,
    format,
    // checkedOut,
    shelfLocation,
    state : condition,
    genre,
    subject,
  }=props.book;

  return (
    <div id="BookEdit">
      <h2 classname="title">{title}</h2>

      <p>
      Author: {authorFirst} {authorLast};
      Publisher: {publisher};
      Year: {publishedYear}
      </p>
      <p>
      ISBN: {isbn};
      UPC: {upc};
      Format: {format}
      </p>
      <p>
      ShelfLocation {shelfLocation} Condition {condition}<br/>
      </p>
      <p>
      Genre:{genre.join(', ')} <br/>
      </p>
      <p>
      Subject: {subject.join(', ')}
      </p>
    </div>
  )
}


export default BookEdit;
