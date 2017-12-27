import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Dialog, Checkbox, LinearProgress} from 'material-ui';
import {CustomInput, CustomTextArea, CustomSubmit, CustomFileInput} from "../../common/Inputs";
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import {storage} from '../../../api/firebase';
import toastr from 'toastr';
//actions
import {saveCourse} from "../../../redux/actions/coursesActions";

const ModuleContainer = ({name, videos={}, removeModule, removeVideo, id, uploadVideo, changeModuleName, changeVideoName}) => {
    const videoIds = Object.keys(videos);
    let theInput;
    return(
        <div className="modules-container">
            <div className="modules-module">
                <i onClick={()=>removeModule(id)}>X</i>
                <CustomInput
                    onChange={e=>changeModuleName(e,id)}
                    label={"Nombre del modulo " + id}
                    value={name}
                />
                <div className="modules-videos">
                    <h4>Videos <span
                        onClick={()=>theInput.click()}
                        className="form-container-add">
                           +
                       </span>
                    </h4>
                    {videoIds.map((k, index)=> {

                       return(
                           <div className="modules-video" key={index}>
                               <i onClick={()=>removeVideo(k,id)}>X</i>
                              <CustomInput
                                  onChange={e=>changeVideoName(e,k,id)}
                                  placeholder="Nombre del video"
                                  value={videos[k].name} />
                               <LinearProgress
                                   color={videos[k].completed === 100 ? "black":"orange"}
                                value={videos[k].completed}
                                mode="determinate"
                               /> {videos[k].completed}%
                           </div>
                       );

                    }
                    )}
                </div>

            </div>


            <input ref={input=>theInput=input} onChange={e=>uploadVideo(e,id)} type="file" accept="video/*" hidden />
        </div>

    );
}

class CourseForm extends Component {

    state = {
        open:true,
        course:{
            id:1
        },
        modules:{
            1:{
                course:1,
                name:"Primer modulo",
                videos: {
                    1: {
                        module:1,
                        link: "link",
                        name: "nombre del video",
                        completed:0,
                        ref:''
                    }
                }
            }
        },
        coverCompleted:0,
        dirty:false
    };

    componentDidMount(){
        this.setState({
            course:this.props.course,
            modules:this.props.modules
        });
    }

    componentWillReceiveProps(p){
        this.setState({
            course:p.course,
            modules:p.modules
        });
    }

    uploadCover = (e) => {
        const cover = e.target.files[0];
        console.log(cover);
        let course = Object.assign({}, this.state.course);
        //primero borramos la anterior
        if(course.coverRef) storage.ref("covers").child(course.coverRef).delete();
        //luego asignamos la nueva
        course["coverRef"] = cover.name;
        //subimos
        const task = storage.ref("covers").child(cover.name).put(cover);
        task.on("state_changed", ({bytesTransferred, totalBytes})=>{
            let coverCompleted = Math.round( (bytesTransferred / totalBytes) * 100);
            this.setState({coverCompleted});
        });
        task.then(s=>{
            course["cover"] = s.downloadURL;
            toastr.success("Tu portada se subió");
            this.setState({course});
        })
            .catch(e=>toastr.error(e.message));




    };

    uploadVideo = (e, moduleId) => {
        const video = e.target.files[0];
        //Primero creamos un nuevo objeto video
        let modules = Object.assign({}, this.state.modules);
        console.log(moduleId, modules[moduleId]);
        let genId = Object.keys(modules[moduleId].videos).length + 1;
        let videoObj = {id:genId, name:video.name, reference:video.name};
        //ahora subimos el video
        const task = storage.ref(moduleId + video.name).child(video.name).put(video);
        task.on("state_changed", ({bytesTransferred, totalBytes})=>{
            let completed = Math.round( (bytesTransferred / totalBytes) * 100);
            videoObj["completed"] = completed;
            modules = Object.assign({}, this.state.modules);
            modules[moduleId].videos[genId] = videoObj;
            this.setState({modules});
        });
        task.then(s=>{
            //lo agregamos al objeto video
           videoObj["link"] = s.downloadURL;
           //asignamos el video a su lugar
            modules[moduleId].videos[genId] = videoObj;
            //y actualizamos el state
            toastr.success("Tu video se ha subido");
           this.setState({modules});
        }).catch(e=>toastr.error(e.message));

    };

    addModule = () => {
        let modules = Object.assign({}, this.state.modules);
        console.log(modules);
        let generatedNum = Object.keys(modules).length + 1;
        modules[generatedNum] = {name:"added", videos:{}, id:generatedNum};
        this.setState({modules});

        //console.log(generatedNum);
    };

    removeModule = (id) => {
        if(window.confirm("seguro que deceas eliminar?")){
            let modules = Object.assign({}, this.state.modules);
            delete modules[id];
            this.setState({modules});
        }
    };

    removeVideo = (videoId, moduleId) => {
        if(window.confirm("Seguro que deceas eliminar el video?")){
            let modules = Object.assign({}, this.state.modules);
            let videoRef = modules[moduleId].videos[videoId].reference;
            delete modules[moduleId].videos[videoId];
            const task = storage.ref(moduleId).child(videoRef);
            //task.cancel();
            task.delete();
            this.setState({modules});
        }

    };

    onRequestClose = () => {
        if(this.state.dirty){
          if( window.confirm("Si sales de la pagina se perderán los datos")){
            this.props.history.goBack();
          }else{
            return;
          }
        }
          
            
        this.props.history.goBack();
          
    };

    changeModuleName = (e, moduleId) => {
        let modules = Object.assign({}, this.state.modules);
        modules[moduleId].name = e.target.value;
        this.setState({modules});
    };

    changeVideoName = (e, videoId, moduleId) => {
        let modules = Object.assign({}, this.state.modules);
        modules[moduleId].videos[videoId].name = e.target.value;
        this.setState({modules});
    };

    onChangeText = (e) => {
        this.setState({dirty:true});
        const field = e.target.name;
        const value = e.target.value;
        const course = Object.assign({}, this.state.course);
        course[field] = value;
        //console.log(course);
        this.setState({course});

        //On price
        if(field === "price"){
            let input = value.replace(/[\D\s\._\-]+/g, "");
            input = input ? parseInt( input, 10 ) : 0;
            //input = input === 0 ? '':input.toLocaleString(navigator.language, { minimumFractionDigits: 2 })
            input = input.toLocaleString(navigator.language);
            course["price"] = input;
        }

        if(field === "name"){
            let slug = this.slugify(value);
            course["slug"] = slug;
        }

        this.setState({course});
    };

    onCheck = (e, check) => {
        const course = Object.assign({}, this.state.course);
        course["isFree"] = check;
        this.setState({course});
        console.log(course)
    };

    slugify = (string) => {
        return string
            .toString()
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w\-]+/g, "")
            .replace(/\-\-+/g, "-")
            .replace(/^-+/, "")
            .replace(/-+$/, "");
    };

    validateForm = () => {
        return true;
    };

    submitCourse = (e) => {
        e.preventDefault();
        if(this.validateForm()){
            let course = Object.assign({}, this.state.course);
            course["modules"] = Object.assign({}, this.state.modules);

            this.props.saveCourse(course)
                .then(()=>{
                this.props.history.goBack();
                toastr.success("Se guardó")
                })
                .catch(e=>toastr.error(e.message));
        }
    };

    render() {
        const {open, modules, coverCompleted} = this.state;
        const {name="", summary="", isFree=false, price='', slug='', body='', cover} = this.state.course;
        let modulesKeys = [];
        if(modules)  {
            modulesKeys = Object.keys(modules);

        }
        return (
           <Dialog
               bodyStyle={{backgroundColor:"#fafafa"}}
               onRequestClose={this.onRequestClose}
               contentStyle={{width:"100%"}}
                open={open}
                autoScrollBodyContent={true}
                title={name ? name:"Agrega un nuevo curso"}
           >
               <form onSubmit={this.submitCourse} className="form-container">
                   <CustomInput
                       maxLength={50}
                       placeholder="Titulo del curso"
                       name="name"
                       onChange={this.onChangeText}
                       value={name}
                   />
                   <CustomFileInput
                       completed={coverCompleted}
                        accept="image"
                        value={cover}
                       onChange={this.uploadCover}
                   />
                   <CustomInput
                       disabled
                       placeholder="slug"
                       name="slug"
                       onChange={this.onChangeText}
                       value={slug}
                   />
                   <CustomInput
                       maxLength={80}
                       name="summary"
                       placeholder="Mini descripción del curso"
                       onChange={this.onChangeText}
                       value={summary}
                   />
                   <CustomTextArea
                       name="body"
                       placeholder="Descripción del curso"
                       onChange={this.onChangeText}
                       value={body}
                   />
                   <Checkbox
                       checkedIcon={<ActionFavorite />}
                       uncheckedIcon={<ActionFavoriteBorder />}
                       label="¿Este curso es gratuito?"
                       onCheck={this.onCheck}
                       checked={isFree}
                   />
                   {!isFree &&
                        <CustomInput
                           type="text"
                           name="price"
                           placeholder="Precio del curso $$"
                           onChange={this.onChangeText}
                           value={price}
                        />
                   }

                   <div>
                       <h3>Modulos <span
                           onClick={this.addModule}
                           className="form-container-add">
                           +
                       </span>
                       </h3>
                       {modulesKeys.map((k, index)=><ModuleContainer
                                                        removeVideo={this.removeVideo}
                                                        changeVideoName={this.changeVideoName}
                                                        changeModuleName={this.changeModuleName}
                                                        uploadVideo={this.uploadVideo}
                                                        removeModule={this.removeModule}
                                                        key={index}
                                                        {...modules[k]}
                                                        id={k} />)}
                   </div>

                   <Checkbox
                       checkedIcon={<Visibility />}
                       uncheckedIcon={<VisibilityOff />}
                       label="¿Publicar el curso?"
                       onCheck={this.onCheck}
                   />

                   <CustomSubmit
                    value="Guardar"
                   />

               </form>

           </Dialog>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const id = ownProps.match.params.id;
    let course = {modules:{}};
    let modules = {};
    if(id !== "new") {
        course = state.courses.list.find(c=>c.id === id); //== pa que no falle
    }
    if(course === undefined) {
        course = {modules:{}};
        modules = {};
    }else{
        modules = course.modules;
    }
    //console.log(id, course);
    return {
        course,
        modules
    };
}



export default CourseForm = connect(mapStateToProps, {saveCourse})(CourseForm);