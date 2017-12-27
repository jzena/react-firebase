import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class ClassRoomVideo extends Component {

    state = {
        paused:false
    };

    pauseVideo = () => {
      const {paused} = this.state;
      if(paused){
          this.video.play();
          this.setState({paused:false});
      }else{
          this.video.pause();
          this.setState({paused:true});
      }
    };

    render() {
        const {video} = this.props;
        return (
            <div>
                <video
                    onClick={this.pauseVideo}
                    ref={video=>this.video=video}
                    style={{width:"100%"}}
                    controls
                    autoPlay={true}
                    src={video.link}></video>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const courseId = ownProps.match.params.courseId;
    const moduleId = ownProps.match.params.moduleId;
    const videoId = ownProps.match.params.videoId;
    const course = state.courses.list.find(c=>c.id === courseId);
    const video = course.modules[moduleId].videos[videoId];
    console.log(video);
    return {
        video
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(dispatch)
    };
}

export default ClassRoomVideo = connect(mapStateToProps, mapDispatchToProps)(ClassRoomVideo);