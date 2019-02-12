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

export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			show: false,
			songInfo: "null",
			visible: false
		}
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

	render() {
		return (
			<section className="landing">
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
								selectedPlaylist={this.props.selectedPlaylist} 
								SelectPlaylist={this.props.SelectPlaylist}
								handleDeletePlaylist={this.props.handleDeletePlaylist}
								handleSubmitPlaylist={this.props.handleSubmitPlaylist}
								playlists={this.props.playlists}/>
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
							<h1>{this.props.selectedPlaylist.name}</h1>
							<Songlist
							songs={this.props.songs}
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
						selectedPlaylist={this.props.selectedPlaylist}
						songs={this.props.songs}
						songInfo={this.state.songInfo}
						/>
					</Zoom>
				</div>
			</section>
		)
	}
}