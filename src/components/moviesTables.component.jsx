import React, { Component } from "react";
import Like from "./common/like.component";
import Table from "./common/table.component";
import auth from "./../services/authService";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
 columns = [
  {
   path: "title",
   label: "Title",
   content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
  },
  { path: "genre.name", label: "Genre" },
  { path: "numberInStock", label: "Stock" },
  { path: "dailyRentalRate", label: "Rate" },
  {
   key: "like",
   content: movie => (
    <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
   )
  }
 ];

 deleteColumn = {
  key: "delete",
  content: movie => (
   <button
    onClick={() => this.props.onDelete(movie)}
    className="btn btn-danger btn-sm"
   >
    Delete
   </button>
  )
 };

 constructor() {
  super();
  const user = auth.getCurrentUser();
  if (user && user.isAdmin) this.columns.push(this.deleteColumn);
 }

 render() {
  const { movies, onSort, sortColumn } = this.props;
  return (
   <Table
    columns={this.columns}
    data={movies}
    sortColumn={sortColumn}
    onSort={onSort}
   />
  );
 }
}

export default MoviesTable;

/* <tbody>
     {movies.map((movie, i) => (
      <tr key={movie._id}>
       <td>{movie.title}</td>
       <td>{movie.genre.name}</td>
       <td>{movie.numberInStock}</td>
       <td>{movie.dailyRentalRate}</td>
       <td></td>
       <td></td>
      </tr>
     ))}
    </tbody> */
