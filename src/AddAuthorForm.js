import React from "react";
import "./AddAuthorForm.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AuthorForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state={
            name: '',
            imageUrl: '',
            books:[],
            tempBook: '',
        };
        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    handleAddBook(event) {
        
        this.setState(prevState => ({
            books: prevState.books.concat(prevState.tempBook),
            tempBook: '',
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return(<form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm__input">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor="imageUrl">Image Url</label>
                <input type="text" name="imageUrl" value={this.state.imageUrl} onChange={this.onFieldChange}/>
            </div>
            <div className="AddAuthorForm__input">
                <label htmlFor="tempBook">Books</label>
                {this.state.books.map((book) => <p key={book}>{book}</p>)}
                <input type="text" name="tempBook" value={this.state.tempBook} onChange={this.onFieldChange}/>
                <input type="button" value="+" onClick={this.handleAddBook}/>
            </div>
            <input type="submit" />
        </form>)
    };
}

function AddAuthorForm({match,onAddAuthor}) {
    return (<div className="AddAuthorForm">
      <h4>Add a new Author</h4>
      <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>);
};

function mapDispatchToProps(dispatch,props){
    return {
        onAddAuthor: (author) => {
            dispatch({type:'ADD_AUTHOR', author});
            props.history.push('/');
        }
    }
}

export default withRouter(connect(() => {}, mapDispatchToProps)(AddAuthorForm));