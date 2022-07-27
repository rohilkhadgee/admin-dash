import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./new.scss"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {auth, db , storage} from '../../firebase';
import { useNavigate } from 'react-router-dom';


const New = ({inputs, title}) => {

  const [file, setFile] = useState('')
  const [data, setData] = useState({})
  const [per, setPer] = useState('')
const navigate = useNavigate()

  useEffect(()=>{
      const uploadFile =() =>{
        const name = new Date().getTime() + file.name
        const storageRef = ref(storage, name);

        const uploadTask = uploadBytesResumable(storageRef, file);
        
          
          uploadTask.on('state_changed', 
            (snapshot) => {
          
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');

              setPer(progress)
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
                  default:
                    break;
              }
            }, 
            (error) => {
             console.log(error)
            }, 
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setData((prev) => ({...prev, img:downloadURL}))
                console.log('File available at', downloadURL);
              });
            }
          );
      }

      file && uploadFile();
  },[file])


  const handleInput = (e) => {
    const id = e.target.id
    const value = e.target.value

    setData({...data, [id]:value})
   
  }



  const handleAdd=async(e) =>{
    e.preventDefault()
    try{
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp:serverTimestamp()
  
      });
      navigate(-1)
    }catch(err){
      console.log(err)
    }

   

  }

  return (
    <div className='new'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
        <h1>{title}</h1>
        </div>
        <div className="bottom">
                <div className="left">
                  <img src={file ? URL.createObjectURL(file) : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'} alt="" />
                </div>
                <div className="right">
                  <form onSubmit={handleAdd}>
                  <div className="formInput">
                        <label htmlFor="file" >
                          Image: <DriveFolderUploadIcon className='icon'/></label>
                        <input type="file" id="file" onChange={e=>setFile(e.target.files[0])}style={{display:"none"}}/>
                      </div>
                      {inputs.map((input) => (
                          <div className="formInput" key={input.id}>
                            <label>{input.label}</label>
                            <input type={input.type} placeholder={input.placeholder} id ={input.id} onChange={handleInput}/>
                          </div>
                        ))}

                      <button type='submit' disabled = {per !== null && per < 100 }>Send</button>
                  </form>
                </div>
        </div>
      </div>
    </div>
  )
}

export default New