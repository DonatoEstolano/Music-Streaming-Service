import React from "react";
import "./Itemlists.css"
import PlaylistItem from "./PlaylistItem"
import { Button, Modal } from 'react-bootstrap';

class PlaylistSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
          selectedPlaylist: {"id" : 0}
        };
      }

    handleSubmit = event => {
        console.log(this.state.selectedPlaylist);
        this.props.handleSubmit(this.state.selectedPlaylist);
        this.setState({ selectedPlaylist: {"id" : 0}});
    }

    SelectPlaylist = playlist => {
        //Save entire object of the selected playlist into Selector state
        this.setState({ selectedPlaylist: playlist });
      }

	render(){
        return (
        <div>

        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                this.props.items.map(item => 
                (
                    <PlaylistItem 
                      playlistData={ item } 
                      selected={ this.state.selectedPlaylist.id === item.id ? true : false } 
                      SelectPlaylist={ this.SelectPlaylist }/>
                ))
            }
            <p>{this.props.items.length < 1 ? "No playlists to delete!" : ""}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleSubmit} disabled={this.state.selectedPlaylist.id === 0}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        </div>   
        );
	}
}

export default PlaylistSelector;

