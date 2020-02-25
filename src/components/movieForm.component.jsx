import React from "react";
import Joi from "joi-browser";
import Form from "./common/form.common";
import { getMovie, saveMovie } from "./../services/movieService";
import { getGenres } from "./../services/genreService";

// const MovieForm = ({ match, history }) => {
class MovieForm extends Form {
 state = {
  data: {
   title: "",
   genreId: "",
   numberInStock: "",
   dailyRentalRate: ""
  },
  genres: [],
  errors: {}
 };
 handleSave = () => this.props.history.push("/movies");

 schema = {
  _id: Joi.string(),
  title: Joi.string()
   .required()
   .min(5)
   .label("Title"),
  genreId: Joi.string()
   .required()
   .label("Genre"),
  numberInStock: Joi.number()
   .required()
   .min(0)
   .max(100)
   .label("Number in Stock"),
  dailyRentalRate: Joi.number()
   .required()
   .min(0)
   .max(10)
   .label("Daily Rental Rate")
 };

 async populateGenre() {
  const { data: genres } = await getGenres();
  this.setState({ genres });
 }

 async populateMovie() {
  try {
   const movieId = this.props.match.params.id;
   if (movieId === "new") return;
   // if (!movie) return this.props.history.replace("/not-found");
   const { data: movie } = await getMovie(movieId);
   this.setState({ data: this.mapToViewModel(movie) });
  } catch (ex) {
   const { response } = ex;
   if (response && response.status === 404)
    this.props.history.replace("/not-found");
  }
 }

 async componentDidMount() {
  await this.populateGenre();
  await this.populateMovie();
 }

 mapToViewModel(movie) {
  return {
   _id: movie._id,
   title: movie.title,
   genreId: movie.genre._id,
   numberInStock: movie.numberInStock,
   dailyRentalRate: movie.dailyRentalRate
  };
 }

 doSubmit = async () => {
  await saveMovie(this.state.data);

  this.props.history.push("/movies");
 };

 render() {
  // if (this.props.match.params.id) {
  //  return (
  //   <div>
  //    <h1>Movie Form {this.props.match.params.id}</h1>
  //    <button className="btn btn-primary" onClick={this.handleSave}>
  //     Save
  //    </button>
  //   </div>
  //  );
  // }
  return (
   <>
    <h1>Movie Form</h1>
    <form onSubmit={this.handleSubmit}>
     {this.renderInput("title", "Title")}
     {this.renderSelect("genreId", "Genre", this.state.genres)}
     {this.renderInput("numberInStock", "Number in Stock", "number")}
     {this.renderInput("dailyRentalRate", "Rate", "number")}
     {this.renderButton("Save")}
    </form>
   </>
  );
 }
}

export default MovieForm;
