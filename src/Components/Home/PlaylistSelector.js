import React from "react";
import "./Itemlists.css"
import PlaylistItem from "./PlaylistItem"
import { Button, Modal } from 'react-bootstrap';

class PlaylistSelector extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          selectedPlaylist: {}
        };
      }

    handleClose() {
        this.setState({ show: false });
      }
    
    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit = event => {
        this.setState({ show: false });
        console.log(this.state.selectedPlaylist);
        this.props.handleSubmit(this.state.selectedPlaylist);
        this.setState({ selectedPlaylist: {}});
    }

    SelectPlaylist = playlist => {
        //Save entire object of the selected playlist into Selector state
        this.setState({ selectedPlaylist: playlist });
      }

	render(){
        return (
        <div>
        <Button variant="primary" onClick={this.handleShow}>
        Delete Playlist
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Playlist</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                this.props.items.map(item => 
                (
                    <PlaylistItem playlistData={item} selected={ this.state.selectedPlaylist.id === item.id ? true : false } SelectPlaylist={this.SelectPlaylist}/>
                ))
            }
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={this.handleSubmit}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        </div>   
        );
	}
}

export default PlaylistSelector;

