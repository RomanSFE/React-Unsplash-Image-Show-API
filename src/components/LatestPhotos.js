import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

export default class LatestPhotos extends Component {

    state = {
        photos: [],
        page: 1,
        search_query: '',
        searching: false,
    }
    componentDidMount() {
        axios.get('https://api.unsplash.com/photos/?client_id=cbff0546cb543800b1e88583c1cda598af517971ae7fe6a69326a81dc5f06295&per_page=20&page='+ this.state.page).then (
            res => this.setState({
                photos: res.data,
                page: this.state.page + 1,
            })
        )
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    loadNext = (e) =>{
        axios.get('https://api.unsplash.com/photos/?client_id=cbff0546cb543800b1e88583c1cda598af517971ae7fe6a69326a81dc5f06295&per_page=20&page='+ this.state.page).then (
            res => this.setState({
                photos: res.data,
                page: this.state.page + 1,
            })
        )
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    searchQuery = (e) =>{
        this.setState({
            search_query: e.target.value
        })
    }
    searchTrigger = (e) =>{
        axios.get('https://api.unsplash.com/search/photos/?client_id=cbff0546cb543800b1e88583c1cda598af517971ae7fe6a69326a81dc5f06295&query='+ this.state.search_query +'&per_page=20&page='+ this.state.page).then (
            res => this.setState({
                photos: res.data.results,
                page: 2,
                searching: true,
                total_found: res.data.total,
                total_found_pages: res.data.total_pages,
            })
        )
        e.preventDefault();  
    }
    searchLoadPage = (e) =>{
        axios.get('https://api.unsplash.com/search/photos/?client_id=cbff0546cb543800b1e88583c1cda598af517971ae7fe6a69326a81dc5f06295&query='+ this.state.search_query +'&per_page=20&page='+ this.state.page).then (
            res => this.setState({
                photos: res.data.results,
                page: this.state.page + 1,
                searching: true,
                total_found: res.data.total,
                total_found_pages: res.data.total_pages,
            })
        )
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    
    render() {
        var searchAction = '';
        var searchButton = '';
        var searchInfo = '';

        if(this.state.searching === true){
            searchAction = <h2>You Searched with - <i>{this.state.search_query}</i></h2>
            searchButton = <button className="btn btn-success" onClick={this.searchLoadPage}>Page No- {this.state.page}</button>
            searchInfo = <span>Total found - {this.state.total_found} | Page {this.state.page - 1} of {this.state.total_found_pages}</span>
        } else {
            searchAction = <h2>Latest Photos</h2>
            searchButton = <button className="btn btn-success" onClick={this.loadNext}>Page No- {this.state.page}</button>
            searchInfo = ''
        }
        return (
            <React.Fragment>
                <div className="row marg-gapx">
                    <div className="col my-auto">{searchAction} {searchInfo}</div>
                    <div className="col col-auto my-auto">
                        <form onSubmit={this.searchTrigger} action="">
                            <input type="text" value={this.state.search_query} onChange={this.searchQuery} placeholder="Search Here"/>
                            <input type="submit" value="Search"/>
                        </form>
                    </div>
                </div>
                <div className="row">
               {
                     this.state.photos.map((photo) =>(
                        <div key={photo.id} className="col-lg-3 col-sm-6 col-md-4">
                            <div className="single-image">
                                <Link to={'photo?id=' + photo.id} className="d-block">
                                    <div className="photo-wrapper">
                                        <img src={photo.urls.small} alt={photo}/>
                                    </div>
                                    <h5>{photo.description}</h5>
                                    <p className="photo-cat">By - {photo.user.first_name} {photo.user.last_name}</p>
                                </Link>
                            </div>
                        </div>
                     ))
               }
               </div>

               <div className="row">
                    <div className="col-lg-12">
                        <div className="load-more-btn text-center ma-auto">{searchButton}</div>
                    </div>
               </div>
            </React.Fragment>
        )

    }
}
