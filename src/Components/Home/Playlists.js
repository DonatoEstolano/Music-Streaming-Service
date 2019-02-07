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
          newPlaylist: "",
          playlists: PlaylistData
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
      this.setState(prevState => ({
        playlists: [...prevState.playlists, {"user": "username",
                                          "id" : prevState.playlists[prevState.playlists.length - 1].id + 1,
                                          "name" : this.state.newPlaylist,
                                          "songs" : []}]
      }))
      this.setState({ newPlaylist: ""});
    }

    DeletePlaylist = d => {
      this.setState({playlists: this.state.playlists.filter(function(playlist) { 
        return playlist.id !== d.id;
      })});
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

        <PlaylistSelector items={ this.state.playlists } handleSubmit={ this.DeletePlaylist }/>

        {
        this.state.playlists.map(item => 
        (
        //     <p className="playlists">{ playlistItem.name }</p>
            <PlaylistItem playlistData={item} selected={ this.props.selectedPlaylist.id === item.id ? true : false } SelectPlaylist={this.props.SelectPlaylist}/>
        ))}
        </div>   
        );
	}
}

export default Playlists;

