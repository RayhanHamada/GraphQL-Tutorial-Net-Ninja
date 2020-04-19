import React from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

interface BookListState {
  selected: string | null;
}

class BookList extends React.Component<{}, BookListState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  displayBooks() {
    var data = (this.props as any).data;

    if (data.loading) {
      return <div>Loading Books...</div>;
    }
    return (data.books as any[]).map((book) => (
      <li
        key={book.id}
        onClick={(e) => {
          this.setState({ selected: book.id });
        }}
      >
        {book.name}
      </li>
    ));
  }

  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected as string} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
