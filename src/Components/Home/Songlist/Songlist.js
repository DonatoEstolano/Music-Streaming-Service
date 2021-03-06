import React from 'react'
import APH from '../Player/AudioPlayerHandler.js';
import slh from './SonglistHandler.js'
import InfiniteScroll from 'react-infinite-scroll-component'
import SongButton from './SongButton.js'

const displaySize = 40

class Songlist extends React.Component {

	constructor(props){
		super(props)
		slh.bind(this)
	}

	state = {
		items: slh.displaySongs(0,displaySize),
		hasMore: slh.hasMore()
	}

	fetchMoreData = () => {
		this.setState({
			items: slh.extendDisplay(displaySize),
			hasMore: slh.hasMore()
		})
	}

	refresh = () => {
		this.setState({
			items: slh.displaySongs(0,displaySize),
			hasMore: slh.hasMore()
		})
		APH.updateHighlight(true);
	}

	render(){
		return (
			<div>
				<InfiniteScroll
					dataLength={this.state.items.length}
					next={this.fetchMoreData}
					hasMore={this.state.hasMore}
					loader={<h4>Loading...</h4>}
					height={'70vh'}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>End of List</b>
						</p>
					}
				>
					{this.state.items.map((i, index) => (
						<SongButton id={i.song.id}
							title={i.song.title}
							artist={i.artist.name}
							duration={i.song.duration}
							songID={i.song.id}
							key={index}
							handleSongClick={this.props.handleSongClick}
						/>
					))}
				</InfiniteScroll>
			</div>
		)
	}
}

export default Songlist
