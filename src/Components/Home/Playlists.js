import React from "react";
import "./Itemlists.css"
import PlaylistItem from "./PlaylistItem"
import PlaylistData from "./Playlists.json"
import { Button, FormGroup, FormControl, ControlLabel, Modal } from 'react-bootstrap';
import PlaylistSelector from "./PlaylistSelector";

class Playlists extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          newPlaylist: ""
        };
      }

    handleClose() {
      this.setState({ show: false });
    }
    
    handleShow() {
      this.setState({ show: true });
    }

    handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
    }

    handleSubmit = event => {
      this.setState({ show: false });
      console.log(this.state.newPlaylist);
      PlaylistData.push(
          {"user" : "username",
          // "id" : PlaylistData.length + 1,
          "id" : PlaylistData[PlaylistData.length - 1].id + 1, //Get the ID of the last playlist and add 1. We can assume this is unique
          "name" : this.state.newPlaylist,
          "songs" : []
            });
      this.setState({ newPlaylist: ""});
    }

    DeletePlaylist = d => {
      var i = 0;
      PlaylistData.forEach(playlist => {
        if(playlist.id === d.id)
        {
          PlaylistData.splice(i, 1);
        }
        i++;
      });
    }

	render(){
        return (
        <div>
        <Button variant="primary" onClick={this.handleShow}>
        New Playlist
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FormGroup controlId="newPlaylist" bsSize="medium">
                  <FormControl
                    autoFocus
                    type="text"
                    value={this.state.newPlaylist}
                    onChange={this.handleChange}
                  />
                <ControlLabel>Playlist Name</ControlLabel>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <PlaylistSelector items={ PlaylistData } handleSubmit={ this.DeletePlaylist }/>

        {
        PlaylistData.map(item => 
        (
        //     <p className="playlists">{ playlistItem.name }</p>
            <PlaylistItem playlistData={item} selected={ this.props.selectedPlaylist.id === item.id ? true : false } SelectPlaylist={this.props.SelectPlaylist}/>
        ))}
        </div>   
        );
	}
}

export default Playlists;

