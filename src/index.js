import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'set_your_own_key';


//create a new component this component will produce some html

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {videos : [], selectedVideo : null};

    this.videoSearch('Xtreme Media Signage');
  };

  videoSearch(term) {
    YTSearch({key: API_KEY, term:term}, (videos) => {
      this.setState({ videos: videos, selectedVideo: videos[0]});
    });
  }

    render() {
      const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);

      return (
      <div className="row">
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => {this.setState({selectedVideo})}}
          
          videos={this.state.videos} />
      </div>
    );
  }
};

//taken this component generated html and put in page
ReactDOM.render(<App/>, document.querySelector('.container'));
