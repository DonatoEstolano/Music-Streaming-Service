import React from "react";
import "./Itemlists.css"
import PlaylistItem from "./PlaylistItem"
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

    getUserPlaylists() {
      return this.props.playlists.filter(playlist => {
        return playlist.user === this.props.cookies.get("UserName");
      })
    }
    
    handleSubmitPlaylist = event => {
      this.setState({ 
        showAddPlaylist: false, 
        newPlaylist: "" });
      this.props.handleSubmitPlaylist(this.state.newPlaylist);
    }

    DeletePlaylist = d => {
      this.props.handleDeletePlaylist(d);
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
          show={ this.state.showDeletePlaylist }
          title={"Delete Playlist"}
          action={"Delete"}/>

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

        <PlaylistItem 
              playlistData={{id: 0, name:"All Songs", songs: []}} 
              selected={ this.props.selectedPlaylist.id === 0 ? true : false } 
              SelectPlaylist={this.props.SelectPlaylist}
              key={0}
            />
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