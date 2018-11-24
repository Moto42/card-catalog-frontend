import React from 'react';

function BookDetails(props) {
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
    // shelfLocation,
    state : condition,
    genre,
    subject,
  }=props.book;
  // const {shelf} = props;



  return (
    <div id="BookEdit">
      <h2 className="title">{title}</h2>

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
      ShelfLocation:
        {
          props.shelf ?
            <div>{`${props.shelf.room} > ${props.shelf.name} > ${props.shelf.container}`}<br/>{props.shelf.description}</div> :
            <div className='waiting'>Processing...</div>
        }
      </p>
      <p>
      Condition {condition}
      </p>
      <p>
      Genre:{genre.join(', ')}
      </p>
      <p>
      Subject: {subject.join(', ')}
      </p>
    </div>
  )
}


export default BookDetails;
