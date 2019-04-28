import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import SelectMovie from './SelectMovie';
import PriceTable from './PriceTable';
import Errors from './Errors';
import './App.css';

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

  async componentDidMount () {
    await this.getMovies();

  }

  // tryMultipleTimes = async (numTries: number, ) => {

  // }
  getMovies = async () =>{
    let data: any = {}
    for(let i = 0; i < 3; i++){
      data= await fetch('/api/movies');
      data = await data.json();
      if(data['code'] !== 3){
        break;
      }
    }
    if(data['code'] === 3){
      this.setState({
        errorCode: 1,
        showErrors: true,
        errorMessage: 'Could not retrive Movies',
        loadingMovies: false
      })
    }
    else{
      await this.setState({showErrors: false, errorCode: 0, loadingMovies: false, movies: data['movies'], movieSelected: Object.keys(data['movies'])[0]})
      this.getMovieDetails();

    }




  }

  async getMovieDetails () {
    await this.setState({loadingPrice: true})
    let data: any
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
    if(data['code'] === 3){
      if(data['code'] === 3){
        this.setState({
          errorCode: 2,
          showErrors: true,
          errorMessage: 'Could not retrive price'
        })
      }
    }else{
      this.setState({showErrors: false, loadingPrice: false, movieDetails: data['cinemas']})
    }

  }

  newMovieSelected = async (e: any)=>{
    console.log(e.target.value )
    await this.setState({ movieSelected: e.target.value })
    this.getMovieDetails();
  }

  clearError = (e: any) => {
    this.setState({showErrors: false})
  }

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
            { this.state.showErrors ?
            <Errors
              errorMessage={this.state.errorMessage}
              errorCode={this.state.errorCode}
              clearError={this.clearError}
              tryAgain={this.tryAgain}
            /> :
            this.state.loadingMovies?<p>Loading</p>:
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
                  {this.state.loadingPrice?<p>Getting Price</p>:
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
