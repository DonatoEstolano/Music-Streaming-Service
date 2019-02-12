import React, { Component } from "react"
import "./Home.css"
import SearchField from "react-search-field"
import ToggleDisplay from "react-toggle-display"
import Sidebar from "./sidebar.js"
import SidebarRight from "./sidebarRight.js"
import Player from "./player.js"
import SLH from './Songlist/SonglistHandler.js'
import Songlist from './Songlist.js'
import Zoom from 'react-reveal/Zoom';
import 'font-awesome/css/font-awesome.min.css'; 
import PlaylistSelector from "./PlaylistSelector";

export default class Home extends Component {
	constructor() {
		super()

		this.closeBookmarkPlaylist = this.closeBookmarkPlaylist.bind(this);
		this.readPlaylists = this.readPlaylists.bind(this);
		this.writePlaylists = this.writePlaylists.bind(this);
		this.handleSubmitPlaylist = this.handleSubmitPlaylist.bind(this);	

		this.state = {
			show: false,
			songInfo: "null",
			visible: false,
			selectedPlaylist: {id: 0, name:"", songs: []}, //Mostly empty playlist object with ID of 0
			playlists: [],
			songs: [],
			songIDToAdd: '-1',
			showBookmarkPlaylist: false
		}

		this.readPlaylists();
	}

	SelectPlaylist = playlist => {
		//Save entire object of the selected playlist into App state
		this.setState({ selectedPlaylist: playlist });
		this.setState({ songs: this.props.MusicData.filter(song => playlist.songs.includes(song.song.id)) });
		SLH.filterListByIDs(playlist.songs);
	  }

	getUserPlaylists() {
	return this.state.playlists.filter(playlist => {
		return playlist.user === this.props.cookies.get("UserName");
	})
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
	
	  handleSubmitPlaylist = newPlaylist => {
		this.setState(prevState => ({
		  playlists: [...prevState.playlists, {"user": this.props.cookies.get("UserName"),
											"id" : this.getLargestID() + 1,
											"name" : newPlaylist, //add the new playlist to the current state
											"songs" : []}]
		}),
		this.writePlaylists);
	  }
	
	  DeletePlaylist = d => {
		this.setState({playlists: this.state.playlists.filter(function(playlist) { 
		  return playlist.id !== d.id;
		})},
		this.writePlaylists); //write the deletion to disk
	  }

	componentDidMount(){
		if(!this.props.cookies.get("UserName")){ //if not logged in redirect to login page
			this.props.history.push("/login"); //comment this out to stop redirect
  		}
	}

	handleClick() {
		this.setState({
			show: !this.state.show,
			visible: !this.state.visible
		})
	}

	logout = event => {
			this.props.cookies.remove("UserName")
			this.props.userHasAuthenticated(false)
			this.props.history.push("/login")
	}

	// Called when a song in the song list gets clicked.
	// Gets the songInfo of the clicked song and updates state
	handleSongClick = (newSongInfo) => {
		this.setState({
			songInfo: newSongInfo
		})
	}

	bookmarkSong = playlist => {
		this.closeBookmarkPlaylist();
		var song = this.state.songIDToAdd;
		var newSelected = playlist;
		newSelected.songs.push(song);
		var index = this.state.playlists.findIndex(newPlaylist => newPlaylist.id === playlist.id);
		var newPlaylists = this.state.playlists;
		newPlaylists[index] = newSelected;
		this.setState({
			playlists: newPlaylists
		},
		this.writePlaylists);
	}

	closeBookmarkPlaylist() {
		this.setState({ showBookmarkPlaylist: false });
	}
	  
	openBookmarkPlaylist() {
		this.setState({ showBookmarkPlaylist: true });
	}
  

	handleBookmarkSong = song => {
		this.setState({
			songIDToAdd: song
		},
		this.openBookmarkPlaylist());
	}

	render() {
		return (
			<section className="landing">
			 	<PlaylistSelector 
					items={ this.getUserPlaylists() } 
					handleSubmit={ this.bookmarkSong } 
					handleClose={ this.closeBookmarkPlaylist }
					show={ this.state.showBookmarkPlaylist }
					action={ "Add to Playlist" }
					title={ "Add Song to Playlist" }/>
				<nav className="landing-inner-top-nav">
					<Zoom>
						<h5 className="logout-btn" onClick={this.logout}>Logout</h5>
						<h5 id="name">Welcome, {this.props.cookies.get("UserName")}</h5>
						<div onClick={() => this.handleClick()}
						className="landing-inner-top-nav-container"
						>
							<div className="container-bar" />
							<div className="container-bar" />
							<div className="container-bar" />
						</div>
					</Zoom>
				</nav>
				<div className="landing-inner-top">
					<div id="playlist-container" className={this.state.visible ? 'show-playlist' : 'hide-playlist'}>
						<Sidebar cookies={this.props.cookies} 
								selectedPlaylist={this.state.selectedPlaylist} 
								SelectPlaylist={this.SelectPlaylist}
								handleDeletePlaylist={this.DeletePlaylist}
								handleSubmitPlaylist={this.handleSubmitPlaylist}
								playlists={this.state.playlists}/>
					</div>
					<div className="landing-inner-top-content">
						<Zoom>
							<SearchField
							classNames="landing-inner-top-searchbar"
							placeholder="Search artist or song or genre"
							onChange={SLH.filterList}
							/>
						</Zoom>
						<div className='cabin-text'>
							<h1>{this.state.selectedPlaylist.name}</h1>
							<Songlist
							songs={this.state.songs}
							handleSongClick={this.handleSongClick}
							/>
						</div>
					</div>
					<div className="playlist-container-right">
						<Zoom>
							<SidebarRight handleSongClick={this.handleSongClick}/>
						</Zoom>
					</div>
				</div>
				<div className="player">
					<Zoom>
						<Player
							selectedPlaylist={this.state.selectedPlaylist}
							songs={this.state.songs}
							songInfo={this.state.songInfo}
							bookmarkSong={this.handleBookmarkSong}
						/>
					</Zoom>
				</div>
			</section>
		)
	}
}
