import React, { Component } from "react"
import "./Home.css"
import SearchField from "react-search-field"
import ToggleDisplay from "react-toggle-display"
import Sidebar from "./sidebar.js"
import SidebarRight from "./sidebarRight.js"
import Player from "./Player.js"
import SLH from './Songlist/SonglistHandler.js'
import Songlist from './Songlist.js'

export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			show: false,
			songInfo: "null"
		}
	}

	componentDidMount(){
		if(!this.props.cookies.get("UserName")){ //if not logged in redirect to login page
			this.props.history.push("/login"); //comment this out to stop redirect
  		}
	}

	handleClick() {
			this.setState({show: !this.state.show})
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
				<div className="landing-inner-top">
				<h4 id="name">Welcome {this.props.cookies.get("UserName")}</h4>
					<nav className="landing-inner-top-nav">
						<div
							onClick={() => this.handleClick()}
							className="landing-inner-top-nav-container"
						>
							<div className="container-bar" />
							<div className="container-bar" />
							<div className="container-bar" />
						</div>
					</nav>
					<ToggleDisplay
						tag="div"
						show={this.state.show}
						className="playlist-container"
					>
						<h4 className="logout-btn" onClick={this.logout}>Logout</h4>
						<Sidebar cookies={this.props.cookies} selectedPlaylist={this.props.selectedPlaylist} SelectPlaylist={this.props.SelectPlaylist}/>
					</ToggleDisplay>
		<div className="playlist-container-right">
			<SidebarRight handleSongClick={this.handleSongClick}/>
		</div>
					<div className="landing-inner-top-content">
                        <SearchField
                            classNames="landing-inner-top-searchbar"
                            placeholder="Search artist or song or genre"
                            onChange={SLH.filterList}
                        />
                        <div className='cabin-text'>
                        <h1>{this.props.selectedPlaylist.name}</h1>
                        <Songlist
                            songs={this.props.songs}
                            handleSongClick={this.handleSongClick}
                        />
                    </div>
					</div>
					<Player
						selectedPlaylist={this.props.selectedPlaylist}
						songs={this.props.songs}
						songInfo={this.state.songInfo}
					/>
				</div>
			</section>
		)
	}
}