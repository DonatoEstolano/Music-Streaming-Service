import React from "react";
import "./Itemlists.css"
import PlaylistItem from "./PlaylistItem"
import PlaylistData from "./Playlists.json"
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
    
        this.state = {
          showAddPlaylist: false,
          showDeletePlaylist: false,
          newPlaylist: "",
          playlists: PlaylistData.slice(1),
          nextID: PlaylistData[0].nextID
        };
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

    handleSubmitPlaylist = event => {
      this.setState({ showAddPlaylist: false });
      console.log(this.state.newPlaylist);
      this.setState(prevState => ({
        playlists: [...prevState.playlists, {"user": this.props.cookies.user,
                                          "id" : prevState.nextID,
                                          "name" : this.state.newPlaylist,
                                          "songs" : []}],
        nextID: prevState.nextID + 1,
      }))
      this.setState({ 
        newPlaylist: "",
        });
    }

    getUserPlaylists() {
      return this.state.playlists.filter(playlist => {
        return playlist.user === this.props.cookies.user;
      })
    }

    DeletePlaylist = d => {
      this.setState({playlists: this.state.playlists.filter(function(playlist) { 
        return playlist.id !== d.id;
      })});
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
            <Button variant="secondary" onClick={this.closeAddPlaylist}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmitPlaylist}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {
        this.getUserPlaylists().map(item => 
        (
            <PlaylistItem 
              playlistData={item} 
              selected={ this.props.selectedPlaylist.id === item.id ? true : false } 
              SelectPlaylist={this.props.SelectPlaylist}/>
        ))
        }
        </div>   
        );
	}
}

export default Playlists;

