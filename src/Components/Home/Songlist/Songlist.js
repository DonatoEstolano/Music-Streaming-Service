import React from "react";
import slh from './SonglistHandler.js';
import InfiniteScroll from "react-infinite-scroll-component";

const displaySize = 40;
const style = {
  height: 30,
  border: "1px solid white",
  margin: 6,
  padding: 8
};

class Songlist extends React.Component {

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
		

	render(){
		return (
			<div>
				<InfiniteScroll
				dataLength={this.state.items.length}
				next={this.fetchMoreData}
				hasMore={this.state.hasMore}
				loader={<h4>Loading...</h4>}
				height={500}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>End of list</b>
					</p>
				}
				>
				{this.state.items.map((i, index) => (
					<div style={style} key={index}>
						{i.release.name}
					</div>
				))}
				</InfiniteScroll>
			</div>
		);
	}
}

export default Songlist;


