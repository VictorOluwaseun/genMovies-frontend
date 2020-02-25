import React, { Component } from "react";
// import Like from "./../common/like.component";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Pagination from "./../common/pagination.component";
import ListGroup from "./../common/listGroup.component";
import { getMovies, deleteMovie } from "./../../services/movieService";
import { getGenres } from "./../../services/genreService";
import { paginate } from "./../../utils/paginate";
import MoviesTable from "../moviesTables.component";
import SearchBox from "./../common/searchBox.common";
// import Form from "./../common/form.common";
import _ from "lodash";

class Movies extends Component {
 state = {
  movies: [],
  genres: [],
  currentPage: 1,
  searchQuery: "",
  selectedGenre: null,
  pageSize: 4,
  sortColumn: { path: "title", order: "asc" }
 };

 async componentDidMount() {
  const { data } = await getGenres();
  const genres = [{ _id: "", name: "All Genres" }, ...data];

  const { data: movies } = await getMovies();

  this.setState({
   movies,
   genres
  });
 }

 handleDelete = async movie => {
  const originalMovies = this.state.movies;
  const movies = originalMovies.filter(m => movie._id !== m._id);
  this.setState({ movies });

  try {
   await deleteMovie(movie._id);
  } catch (ex) {
   const { response } = ex;
   if (response && response.status === 404) {
    toast.error("This movie has already been deleted!");

    this.setState({ movies: originalMovies });
   }
  }
 };

 handleLiked = movie => {
  const movies = [...this.state.movies];
  const index = movies.indexOf(movie);
  movies[index] = { ...movies[index] };
  movies[index].liked = !movies[index].liked;
  this.setState({ movies });
 };

 handlePageChange = page => {
  this.setState({ currentPage: page });
 };

 handleGenreSelect = genre => {
  this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
 };

 handleSearch = query => {
  this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
 };

 handleSort = sortColumn => {
  this.setState({ sortColumn });
 };

 getPageDate = () => {
  const {
   pageSize,
   currentPage,
   sortColumn,
   selectedGenre,
   searchQuery,
   movies: allMovies
  } = this.state;

  // const filtered =
  //  selectedGenre && selectedGenre._id
  //   ? allMovies.filter(m => m.genre._id === selectedGenre._id)
  //   : allMovies;

  let filtered = allMovies;
  if (searchQuery)
   filtered = allMovies.filter(m =>
    m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
   );
  else if (selectedGenre && selectedGenre._id)
   filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const movies = paginate(sorted, currentPage, pageSize);

  return { totalCount: filtered.length, data: movies };
 };

 render() {
  const { length: moviesCount } = this.state.movies;
  const { pageSize, currentPage, searchQuery, sortColumn } = this.state;
  const { user } = this.props;

  if (moviesCount === 0) {
   return (
    <h1 style={{ textAlign: "center" }}>There are no movies in the database</h1>
   );
  }

  // const filtered =
  //  selectedGenre && selectedGenre._id
  //   ? allMovies.filter(m => m.genre._id === selectedGenre._id)
  //   : allMovies;
  // const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  // const movies = paginate(sorted, currentPage, pageSize);

  const { totalCount, data: movies } = this.getPageDate();

  return (
   <div className="row">
    <div className="col-2">
     <ListGroup
      items={this.state.genres}
      selectedItem={this.state.selectedGenre}
      onItemSelect={this.handleGenreSelect}
     />
    </div>
    <div className="col">
     {/* <Link to="/movies/new">
      <div className="mb-3">{this.renderButton("New Movie", false)}</div>
     </Link> */}
     {user && (
      <Link
       to="/movies/new"
       className="btn btn-primary"
       style={{ marginBottom: 20 }}
      >
       New Movie
      </Link>
     )}
     <p>Showing {totalCount} movies in the database.</p>
     <SearchBox value={searchQuery} onChange={this.handleSearch} />
     <MoviesTable
      movies={movies}
      sortColumn={sortColumn}
      onLike={this.handleLiked}
      onDelete={this.handleDelete}
      onSort={this.handleSort}
     />

     <Pagination
      // itemsCount={moviesCount}
      itemsCount={totalCount}
      pageSize={pageSize}
      currentPage={currentPage}
      onPageChange={this.handlePageChange}
     />
    </div>
   </div>
  );
 }
}
//Pagination: Total number of items, page size based on these information, pagination calculate the no of pages and render them
export default Movies;
