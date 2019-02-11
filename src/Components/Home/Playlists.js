import React from "react";
import "./Itemlists.css"
import PlaylistItem from "./PlaylistItem"
// import PlaylistData from "./Playlists.json"
import 'font-awesome/css/font-awesome.min.css';
import { Button, FormGroup, FormControl, ControlLabel, Modal } from 'react-bootstrap';
import PlaylistSelector from "./PlaylistSelector";

class Playlists extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.closeAddPlaylist = this.closeAddPlaylist.bind(this);
        this.openAddPlaylist = this.openAddPlaylist.bind(this);
        this.closeDeletePlaylist = this.closeDeletePlaylist.bind(this);
        this.openDeletePlaylist = this.openDeletePlaylist.bind(this);
        this.readPlaylists = this.readPlaylists.bind(this);
        this.writePlaylists = this.writePlaylists.bind(this);

        this.state = {
          showAddPlaylist: false,
          showDeletePlaylist: false,
          newPlaylist: "",
          playlists: []
        };

        this.readPlaylists();
      }

      readPlaylists() {

      function getPlaylistData(){ //calls the server
        return Promise.all([fetch('http://localhost:5000/playlist_data').then(response => response.json())]) //gets the json object
      }

      getPlaylistData().then(([PlaylistData])=> { //then keyword waits until the json data is loaded
          
        this.setState({ 
          playlists: PlaylistData
        });

      });
    }

    writePlaylists() {
      fetch('http://localhost:5000/add_playlist',{
        method: 'POST',
        body: JSON.stringify(this.state.playlists), //Send updated playlists to server
        headers: {"Content-Type": "application/json"}
      });

    }

    closeAddPlaylist() {
      this.setState({ showAddPlaylist: false });
    }
    
    openAddPlaylist() {
      this.setState({ showAddPlaylist: true });
    }

    closeDeletePlaylist() {
      this.setState({ showDeletePlaylist: false });
    }
    
    openDeletePlaylist() {
      this.setState({ showDeletePlaylist: true });
    }

    handleChange = event => {
      this.setState({
          [event.target.id]: event.target.value
      });
    }

    getLargestID() {
      if (this.state.playlists === undefined || this.state.playlists.length === 0) {// array empty or does not exist
        return 0;
      }
      var largest = Math.max.apply(Math, this.state.playlists.map(playlist => { return playlist.id; }));
      if (largest == null)
      {
        largest = 0;
      }
      return largest; //get the largest ID in the file and return it
    }

    handleSubmitPlaylist = event => {
      this.setState({ showAddPlaylist: false });
      this.setState(prevState => ({
        playlists: [...prevState.playlists, {"user": this.props.cookies.get("UserName"),
                                          "id" : this.getLargestID() + 1,
                                          "name" : this.state.newPlaylist, //add the new playlist to the current state
                                          "songs" : []}]
      }));
      this.setState({ 
        newPlaylist: "",
        },
        this.writePlaylists);
    }

    getUserPlaylists() {
      return this.state.playlists.filter(playlist => {
        return playlist.user === this.props.cookies.get("UserName");
      })
    }

    DeletePlaylist = d => {
      this.setState({playlists: this.state.playlists.filter(function(playlist) { 
        return playlist.id !== d.id;
      })},
      this.writePlaylists); //write the deletion to disk
      this.setState({ showDeletePlaylist: false })
      if (this.props.selectedPlaylist.id === d.id) //If we delete the currently selected playlist
      {
        this.props.SelectPlaylist({id: 0, name:"", songs: []}); //Deselect that playlist
      }
    }

	render(){
        return (
        <div>
        <h1>Playlists  
          <i className="fa fa-plus clickable" onClick={this.openAddPlaylist}></i>
          <i className="fa fa-trash clickable" onClick={this.openDeletePlaylist}></i>
        </h1>

        {/* <Button variant="primary" onClick={this.handleShow}>
        New Playlist
        </Button> */}

        <PlaylistSelector 
          items={ this.getUserPlaylists() } 
          handleSubmit={ this.DeletePlaylist } 
          handleClose={ this.closeDeletePlaylist }
          show={ this.state.showDeletePlaylist }/>

        <Modal show={this.state.showAddPlaylist} onHide={this.closeAddPlaylist}>
          <Modal.Header closeButton>
            <Modal.Title>Add Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FormGroup controlId="newPlaylist" bsSize='large'>
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
            <Button variant="secondary" onClick={this.closeAddPlaylist}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmitPlaylist}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {
        this.getUserPlaylists().map((item,index) => 
        (
            <PlaylistItem 
              playlistData={item} 
              selected={ this.props.selectedPlaylist.id === item.id ? true : false } 
              SelectPlaylist={this.props.SelectPlaylist}
              key={index}
            />
        ))
        }
        </div>   
        );
	}
}

export default Playlists;