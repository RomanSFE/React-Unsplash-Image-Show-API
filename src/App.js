import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LatestPhotos from './components/LatestPhotos';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Photo from './components/Photo';

function App() {
  return (
    <Router>
    <div className="App">
        <Header/>
        <div className="container-block">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <Route exact path="/" render={pages =>(
                  <LatestPhotos/>
                )}/>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/photo" component={Photo}/>
              </div>
            </div>
          </div>
        </div>

        <Footer/>
    </div>
    </Router>
  );
}

export default App;
