import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from './../queries/queries';

interface AddBookState {
  name: string;
  genre: string;
  authorId: string;
}

class AddBook extends React.Component<{}, AddBookState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      authorId: '',
    };
    this.submitForm = this.submitForm.bind(this);
  }

  displayAuthors() {
    const data = (this.props as any).getAuthorsQuery;

    if (data.loading) return <option>Loading Author...</option>;

    return (data.authors as any[]).map((author) => (
      <option value={author.id} key={author.id}>
        {author.name}
      </option>
    ));
  }

  submitForm(e: any) {
    e.preventDefault();
    (this.props as any).addBookMutation({
      variables: {
        ...this.state,
      },
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });
  }

  render() {
    return (
      <form action="" id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label htmlFor="">Book Name:</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="">Genre:</label>
          <input
            type="text"
            onChange={(e) => {
              this.setState({ genre: e.target.value });
            }}
          />
        </div>

        <div className="field">
          <label htmlFor="">Author:</label>
          <select
            name=""
            id=""
            onChange={(e) => {
              this.setState({ authorId: e.target.value });
            }}
          >
            <option value="">Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
