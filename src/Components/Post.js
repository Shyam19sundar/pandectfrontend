import React, { useState, useEffect } from 'react'
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import "../Css/Post.css"
import { useStateValue } from '../StateProvider';
import Login from "./Login"
import axios from "./axios"
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import ReactLoading from 'react-loading';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { storage } from "../firebase"
import $ from 'jquery'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


function Post() {
  const [{ user }, dispatch] = useStateValue()
  const [isCondnTrue, setisCondnTrue] = useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [title, settitle] = useState("")
  const [type, settype] = useState("")
  const [subtext, setsubtext] = useState("")
  const [content, setcontent] = useState("")
  const [youtube, setyoutube] = useState("")
  const [insta, setinsta] = useState("")
  const [postUser, setpostUser] = useState("")
  const [images, setImages] = useState([])
  const [urlImagestate, seturlImage] = useState([])
  const [urlDocsstate, seturlDocs] = useState([])

  var url = []
  var urlImage = []
  var urlDocs = []
  const history = useHistory()
  var time = setInterval(function () {
    if (((urlImage.length + urlDocs.length) != 0) && ((urlImage.length + urlDocs.length) == images.length)) {
      $('#loadingUpload').hide()
      $('.postContainer').css({ opacity: '1' })
      clearInterval(time)
      history.push('/')
    }
  }, 1000);

  const postSubmit = (e) => {
    setpostUser(user?.email)
    e.preventDefault()
    var optionSelected = $('#inputtype option:selected').attr('value')
    if ($('#titleId').val() === '') {
      $('.textError').text('Choose a value*').show()
      $('.textareaError').text('Choose a value*').hide()
      $('.selectError').text('Choose a value*').hide()
    }
    else if (optionSelected === 'choose') {
      $('.textError').text('Choose a value*').hide()
      $('.selectError').text('Choose a value*').show()
      $('.textareaError').text('Choose a value*').hide()
    }
    else if ($('#textareaId').val() === '') {
      $('.selectError').text('Choose a value*').hide()
      $('.textareaError').text('Choose a value*').show()
      $('.textError').text('Choose a value*').hide()
    }
    else {
      $('.textError').text('Choose a value*').hide()
      $('.selectError').text('Choose a value*').hide()
      $('.textareaError').text('Choose a value*').hide()
      if (images.length !== 0) {
        $('.postContainer').css({ opacity: '0.3' })
        $('#loadingUpload').show()
        for (let i = 0; i < images.length; i++) {
          const type = images[i].type.substring(images[i].type.lastIndexOf("/") + 1)
          console.log(type)
          if (type === "jpg" || type === "jpeg" || type === "png" || type === "gif") {
            const date = Date.now()
            const uploadTask = storage.ref(`images/${images[i]?.name}_${date}`).put(images[i]);
            uploadTask.on(
              "state_changed",
              snapshot => {
                const progressCurrent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
              },
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref("images")
                  .child(`${images[i]?.name}_${date}`)
                  .getDownloadURL()
                  .then(urlTemp => {
                    urlImage.push(urlTemp)
                    seturlImage(urlImage)
                    if ((urlImage.length + urlDocs.length) == images.length) {
                      setisCondnTrue(true)
                    }
                  });
              }
            )
          }
          else {
            const date = Date.now()
            const uploadTask = storage.ref(`docs/${images[i]?.name}_${date}`).put(images[i]);
            uploadTask.on(
              "state_changed",
              snapshot => {
                const progressCurrent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
              },
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref("docs")
                  .child(`${images[i]?.name}_${date}`)
                  .getDownloadURL()
                  .then(urlTemp => {
                    urlDocs.push(urlTemp)
                    seturlDocs(urlDocs)
                    if ((urlImage.length + urlDocs.length) == images.length) {
                      setisCondnTrue(true)
                    }
                  });
              }
            )
          }
        }
      }
      else {
        axios.post("/newpost", {
          title: title,
          type: type,
          subtext: subtext,
          youtube: youtube,
          insta: insta,
          content: content,
          user: user.email,
          url: url
        }).then(
          res =>
            history.push('/')
        )

      }
    }
  }
  const postSubmitAnonymously = (e) => {
    e.preventDefault()
    setpostUser(null)

    var optionSelected = $('#inputtype option:selected').attr('value')
    if ($('#titleId').val() === '') {
      $('.textError').text('Choose a value*').show()
      $('.textareaError').text('Choose a value*').hide()
      $('.selectError').text('Choose a value*').hide()
    }
    else if (optionSelected === 'choose') {
      $('.textError').text('Choose a value*').hide()
      $('.selectError').text('Choose a value*').show()
      $('.textareaError').text('Choose a value*').hide()
    }
    else if ($('#textareaId').val() === '') {
      $('.selectError').text('Choose a value*').hide()
      $('.textareaError').text('Choose a value*').show()
      $('.textError').text('Choose a value*').hide()
    }
    else {
      $('.textError').text('Choose a value*').hide()
      $('.selectError').text('Choose a value*').hide()
      $('.textareaError').text('Choose a value*').hide()
      if (images.length != 0) {
        $('.postContainer').css({ opacity: '0.3' })
        $('#loadingUpload').show()
        for (let i = 0; i < images.length; i++) {
          const type = images[i].type.substring(images[i].type.lastIndexOf("/") + 1)
          console.log(type)
          if (type === "jpg" || type === "jpeg" || type === "png" || type === "gif") {
            const date = Date.now()
            const uploadTask = storage.ref(`images/${images[i]?.name}_${date}`).put(images[i]);
            uploadTask.on(
              "state_changed",
              snapshot => {
                const progressCurrent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
              },
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref("images")
                  .child(`${images[i]?.name}_${date}`)
                  .getDownloadURL()
                  .then(urlTemp => {
                    urlImage.push(urlTemp)
                    seturlImage(urlImage)
                    if ((urlImage.length + urlDocs.length) == images.length) {
                      setisCondnTrue(true)
                    }
                  });
              }
            )
          }
          else {
            const date = Date.now()
            const uploadTask = storage.ref(`docs/${images[i]?.name}_${date}`).put(images[i]);
            uploadTask.on(
              "state_changed",
              snapshot => {
                const progressCurrent = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
              },
              error => {
                console.log(error);
              },
              () => {
                storage
                  .ref("docs")
                  .child(`${images[i]?.name}_${date}`)
                  .getDownloadURL()
                  .then(urlTemp => {
                    urlDocs.push(urlTemp)
                    seturlDocs(urlDocs)
                    if ((urlImage.length + urlDocs.length) == images.length) {
                      setisCondnTrue(true)
                    }
                  });
              }
            )
          }
        }
      }
      else {
        axios.post("/newpost", {
          title: title,
          type: type,
          subtext: subtext,
          youtube: youtube,
          insta: insta,
          content: content,
          user: null,
          url: url
        }).then(res => {
          history.push('/')
        })
      }
    }
  }


  const handleChange = e => {
    if (e.target.files[0]) {
      var temp = e.target.files[0]
      $('#uploadButton').css({ cursor: 'pointer' })
      setImages([...images, temp])
    }
  }

  useEffect(() => {
    if (isCondnTrue) {
      axios.post("/newpost", {
        title: title,
        type: type,
        subtext: subtext,
        youtube: youtube,
        insta: insta,
        content: content,
        user: postUser,
        docs: urlDocsstate,
        images: urlImagestate
      })
        .then(res => console.log(res.data))
    }
  }, [isCondnTrue])


  return (

    <div>
      <ReactLoading id='loadingUpload' color='#000000' type='bars' />
      <form className='postContainer'>
        <div>
          <div className="tile_type">
            <div className="form-group col-md-4">
              <label for="inputtitle">Title</label>
              <input id="titleId" onChange={(e) => (settitle(e.target.value))} type="text" className="form-control" placeholder="Title" required />
              <p className='textError'></p>
            </div>
            <div className="form-group col-md-2">
              <label for="inputtype">Type</label>
              <select onChange={(e) => (settype(e.target.value))} id="inputtype" className="form-control" required >
                <option disabled selected hidden value='choose'>Choose...</option>
                <option value='cinema'>Cinema</option>
                <option value='cooking'>Cooking</option>
                <option value='music'>Music</option>
                <option value='art'>Art</option>
                <option value="craft">Craft</option>
                <option value="literature">Literature</option>
                <option value="photography">Photography</option>
              </select>
              <p className='selectError'></p>
            </div>
          </div>
        </div>
        <div className="form-group col-md-6">
          <label for="inputAddress">Subtext</label>
          <input onChange={(e) => (setsubtext(e.target.value))} type="text" className="form-control" id="inputAddress" placeholder="Subtext" />
        </div>
        <div className="form-group  col-md-6" >
          <label for="content">Content</label>
          {/* <textarea id="textareaId" onChange={(e) => (setcontent(e.target.value))} className="form-control" rows="8" placeholder="Content" required></textarea> */}
          <TextareaAutosize id="textareaId" onChange={(e) => (setcontent(e.target.value))} className="form-control" aria-label="minimum height" rowsMin={5} required />
          <p className="textareaError"></p>
        </div>
        <div className="tag ">
          <div className='socialmedia-links'>
            <div>
              <label htmlFor="Tag">Youtube Link</label>
              <input onChange={(e) => (setyoutube(e.target.value))} className="form-control" rows="4" placeholder="Youtube Link" />
            </div>
            <div>
              <label>Insta Link</label>
              <input onChange={(e) => (setinsta(e.target.value))} className="form-control" rows="4" placeholder="Insta Link" />
            </div>
          </div>
          <div className="signin ">
            <p >Publisher ID</p>
            {user ?
              <Button className="btn btn-primary" onClick={postSubmit} >{`Post as ${user?.displayName}`}</Button>
              :
              <Button className="btn btn-primary" onClick={() => setModalShow(true)} >SIGN IN</Button>
            }
            <Login
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <p className="or" >Or</p>
            <button className="btn btn-primary" onClick={postSubmitAnonymously} >Post Anonymous</button>
          </div>

          <div className="filecont">
            <div className="fileUpload" onChange={handleChange}>
              <CloudUploadIcon id='cloudIcon' />
              <input id="upload" type="file" hidden multiple />
              <label htmlFor="upload" className="bg-success uploadbut">   Choose files to Upload  </label>
              <div className="uploadContainer">
                {images?.map(item => {
                  const type = item.type.substring(item.type.lastIndexOf("/") + 1)
                  if (type === "jpg" || type === "jpeg" || type === "png" || type === "gif") {
                    return (
                      <div className="uploadContainerShyam">
                        <p id='uploadStat'>{item.name}</p>
                        <img className='previewImage' src={window.URL.createObjectURL(item)} />
                      </div>
                    )
                  }
                  else {
                    return (
                      <div className="uploadContainerShyam">
                        <p id='uploadStat'>{item.name}</p>
                        <img className='previewImage' src="docs.png" />
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default Post