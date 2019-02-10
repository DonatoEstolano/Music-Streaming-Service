import React from "react";
import "./Songlist.css";
import slh from './SonglistHandler.js';
import InfiniteScroll from "react-infinite-scroll-component";
import SongButton from './SongButton.js';

const displaySize = 40;

class Songlist extends React.Component {

	constructor(props){
		super(props);
		slh.bind(this);
	}

	state = {
		items: slh.displaySongs(0,displaySize),
		hasMore: slh.hasMore()
	};

	fetchMoreData = () => {
		this.setState({
			items: slh.extendDisplay(displaySize),
			hasMore: slh.hasMore()
		});
	};

	refresh = () => {
		this.setState({
			items:[],
			hasMore: false
		});
		this.setState({
			items: slh.displaySongs(0,displaySize),
			hasMore: slh.hasMore()
		});
	}

	render(){
		return (
			<div>
				<InfiniteScroll
				dataLength={this.state.items.length}
				next={this.fetchMoreData}
				hasMore={this.state.hasMore}
				loader={<h4>Loading...</h4>}
				height={'80vh'}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>End of list</b>
					</p>
				}
				>
				{this.state.items.map((i, index) => (
					<SongButton id={i.song.id} name={i.song.title} key={index}
						handleSongClick={this.props.handleSongClick}
					/>
				))}
				</InfiniteScroll>
			</div>
		);
	}
}

export default Songlist;


