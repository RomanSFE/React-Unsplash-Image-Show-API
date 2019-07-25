import React, { Component } from 'react';
import axios from 'axios';

export default class Photo extends Component {

    state = {
        photo: [],
        loading: true
    }

    componentDidMount() {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let photo_id = params.get('id')

        axios.get('https://api.unsplash.com/photos/'+ photo_id +'/?client_id=cbff0546cb543800b1e88583c1cda598af517971ae7fe6a69326a81dc5f06295').then (
            res => this.setState({
                photo: res.data,
                loading: false,
            })
        )

    }


    render() {
        console.log(this.state.photo)
        var photo = this.state.photo
        return (
            <div>
                <div className="photo-sing-wrapper">
                    <div className="photo-sing-info">
                        {photo.title ? <h3>{photo.story.title}</h3> : ''}
                        {photo.description ? <h4 className="mb-4">{photo.description}</h4> : ''}
                        
                        <ul>
                            <li><label htmlFor="uploaded_by"><span>Uploaded by - </span> </label> {photo.user && photo.user.first_name} {photo.user && photo.user.last_name}</li>
                            {photo.updated_at ? <li><label htmlFor="uploaded_date"><span>Uploaded date -</span> </label> {photo.updated_at}</li> : ''}
                            <li><label htmlFor="camera"><span>Camera -</span> </label> {photo.exif && photo.exif.model}</li>
                            <li><label htmlFor="location"><span>Location -</span> </label>{photo.location && photo.location.city}</li>
                            <li><label htmlFor="downloads"><span>Total Downloads -</span> </label> {photo.downloads}</li>
                        </ul>
                        <div className="down-btn mb-4">
                            <a href={photo.links && photo.links.download} target="_blank"><button className="btn btn-info">Download</button></a>
                        </div>
                    </div>
                    <img src={photo.urls && photo.urls.full} alt=" "/>
                </div>
            </div>
        )
    }
}
