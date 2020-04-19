import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';

interface BookDetailsProps extends React.ComponentProps<any> {
  bookId: string;
}

class BookDetails extends React.Component<BookDetailsProps> {
  displayBookDetails() {
    const { book } = (this.props as any).data;

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author</p>
          <ul className="other-books">
            {(book.author.books as any[])
              .filter((b) => b.name !== book.name)
              .map((b) => (
                <li key={b.id}>{b.name}</li>
              ))}
          </ul>
        </div>
      );
    }

    return <div>no book selected...</div>;
  }

  render() {
    return (
      <div id="book-details">
        <p>Output book detail here</p>
        {this.displayBookDetails()}
      </div>
    );
  }
}

export default graphql<BookDetailsProps>(getBookQuery, {
  options: function (props) {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetails);
