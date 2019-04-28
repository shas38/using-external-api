import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import SelectMovie from './SelectMovie';
import PriceTable from './PriceTable';
import Errors from './Errors';
import './App.css';
// Main class for combining all the components
class App extends Component {
  state: any
  constructor(props: any){
    super(props)
    this.state= {
      movies: {},
      movieDetails: {},
      movieSelected: '',
      showErrors: false,
      errorMessage: '',
      errorCode: 0,
      loadingMovies: true,
      loadingPrice: true,
    };
  }
  // Get the movie names after the component mounts
  async componentDidMount () {
    await this.getMovies();
  }
  // Function for getting movie names
  // This function does not take any arguments
  getMovies = async () =>{
    let data: any = {}
    // Try at most three times to get the data from the backend
    for(let i = 0; i < 3; i++){
      data= await fetch('/api/movies');
      data = await data.json();
      if(data['code'] !== 3){
        break;
      }
    }
    // If unsuccessful then show error
    if(data['code'] === 3){
      this.setState({
        errorCode: 1,
        showErrors: true,
        errorMessage: 'Could not retrive Movies',
        loadingMovies: false
      })
    }
    // If successfull then then change the state and get movie details
    else{
      await this.setState({showErrors: false, errorCode: 0, loadingMovies: false, movies: data['movies'], movieSelected: Object.keys(data['movies'])[0]})
      this.getMovieDetails();
    }
  }
  // Function for getting movie price
  // This function does not take any arguments
  async getMovieDetails () {
    // Set loading to true
    await this.setState({loadingPrice: true})
    let data: any
    // Try at most three times to get the data from the backend
    for(let i = 0; i < 3; i++){
      data = await fetch('/api/movie', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(this.state.movies[this.state.movieSelected]), // body data type must match "Content-Type" header
      });
      data = await data.json();
      if(data['code'] !== 3){
        break;
      }
    }
    // If unsuccessful then show error
    if(data['code'] === 3){
      if(data['code'] === 3){
        this.setState({
          errorCode: 2,
          showErrors: true,
          errorMessage: 'Could not retrive price'
        })
      }
    }
    // If successfull then then change the state
    else{
      this.setState({showErrors: false, loadingPrice: false, movieDetails: data['cinemas']})
    }
  }
  // Function for updating the state with the selected movie
  newMovieSelected = async (e: any)=>{
    console.log(e.target.value )
    await this.setState({ movieSelected: e.target.value })
    this.getMovieDetails();
  }
  // Function for clearing errors
  clearError = (e: any) => {
    this.setState({showErrors: false})
  }
  // Function for trying to fetch data from the client again
  tryAgain = async (e: any) => {
    let errorCode = this.state.errorCode
    if(errorCode == 1)
      await this.getMovies();
    else if(errorCode == 2)
      await this.getMovieDetails();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            { this.state.showErrors ? // If showErrors is true then render only the error component
            <Errors
              errorMessage={this.state.errorMessage}
              errorCode={this.state.errorCode}
              clearError={this.clearError}
              tryAgain={this.tryAgain}
            /> : // If showErrors is false then diplay the other components
            this.state.loadingMovies?<p>Loading</p>: // Show loading message while fetching movies
              <React.Fragment>
                <Container>
                    <h1 style={{margin: '50px'}}>Compare Movie Price</h1>
                </Container>
                <Container>
                    <SelectMovie
                      newMovieSelected={this.newMovieSelected}
                      movies={this.state.movies}
                    />
                </Container>
                <Container>
                  {this.state.loadingPrice?<p>Getting Price</p>:// Show 'Getting Price' message while fetching price
                    <PriceTable
                      movieDetails={this.state.movieDetails}
                    />
                  }
                </Container>
              </React.Fragment>
            }
          </Container>
        </header>
      </div>
    );
  }
}

export default App;
