import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateProfile, logOut} from '../../redux/actions/userActions';
import {ProfilePageDisplay} from './ProfilePageDisplay';
import toastr from 'toastr';
import firebase from '../../api/firebase';

class ProfileContainer extends Component{

    state = {
        profile:{},
        loading:false,
        completed:0
    };

    logOut = () => {
        this.props.logOut();
        this.props.history.push("/");
    };

    onChange = (e) => {
        let profile = Object.assign({}, this.state.profile);
        const field = e.target.name;
        const value = e.target.value;
        profile[field] = value;
        this.setState({profile});
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.updateProfile(this.state.profile)
            .then(()=>toastr.success("Tus datos se guardaron"))
            .catch(e=>toastr.error("no se pudo guardar", e));
    };

    changeCover = (e) => {
        let file = e.target.files[0];
        if(file.size > 1500000) return toastr.warning("Tu imagen es muy pesada");
        this.setState({loading:true});
        let profile = this.state.profile;
        const task = firebase.storage().ref(this.props.usuario.uid).child("portada").put(file);
        task.on("state_changed", ({bytesTransferred, totalBytes})=>{
            const completed = (bytesTransferred / totalBytes) * 100;
            this.setState({completed})
        });
        task.then(s=>{
                profile["portada"] = s.downloadURL;
                this.setState({profile, loading:false});
            })
            .catch(e=>console.log(e))
    };

    changePic = (e) => {
        let file = e.target.files[0];
        if(file.size > 1500000) return toastr.warning("Tu imagen es muy pesada");
        this.setState({loading:true});
        let profile = this.state.profile;
        const task = firebase.storage().ref(this.props.usuario.uid).child("perfilPic").put(file);
        task.on("state_changed", ({bytesTransferred, totalBytes})=>{
            const completed = (bytesTransferred / totalBytes) * 100;
            this.setState({completed})
        });
        task
            .then(s=>{
                profile["photoURL"] = s.downloadURL;
                this.setState({profile, loading:false});
            })
            .catch(e=>console.log(e))
    };

    componentWillMount(){
        if(!localStorage.getItem("user")){
            this.props.history.push("/login");
        }
    }

    componentWillReceiveProps(p){
        this.setState({profile:p.usuario});
    }

    componentDidMount(){
        this.setState({profile:this.props.usuario});
    }

    render(){
        const {profile, loading, completed} = this.state;
        const {fetched} = this.props;
        return(
            <ProfilePageDisplay
                completed={completed}
                logOut={this.logOut}
                changePic={this.changePic}
                loading={loading}
                changeCover={this.changeCover}
                fetched={fetched}
                onChange={this.onChange}
                onSubmit={this.onSubmit}
                {...profile}/>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state.user)
    return {
        usuario: state.user.profile,
        fetched: Object.keys(state.user.profile).length > 0
    };
}

export default ProfileContainer = connect(mapStateToProps, {updateProfile, logOut})(ProfileContainer);