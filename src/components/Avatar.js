import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../api/axios";

const Avatar = () => {
    
    const { auth } = useAuth()
    const id = auth.id

    const [file, setFile] = useState([]);
    
    //handle and convert it in base 64
    const handleImage = (e) =>{
        const fileInfo = e.target.files[0];
        setFileToBase(fileInfo);
        console.log(fileInfo);
    }

    const setFileToBase = (fileInfo) =>{
        const reader = new FileReader();
        reader.readAsDataURL(fileInfo);
        reader.onloadend = () =>{
            setFile(reader.result);
        }

    }

    //submit the form
    const submitForm = async (e) =>{
        e.preventDefault();
        try {

            const response = await axiosPrivate.post(`http://localhost:3500/users/${id}`, 
            JSON.stringify({file}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            // const {data} = await axiosPrivate.post(`http://localhost:3500/users/${id}`, {file})
            if  (response.success === true){
                setFile('');
                console.log('created avatar')
            }
            console.log(response);
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <form className="pt-5 border h-[350px]" enctype="multipart/form-data" onSubmit={submitForm}>
            
            <div className="form-outline mb-4">
                <input onChange={handleImage}  type="file" id="formupload" name="file" className="form-control"  />
                <label className="form-label" htmlFor="form4Example2"></label>
            </div>
            <img className="img-fluid" src={file} alt="" />
            <button  type="submit" className="btn btn-primary btn-block mb-4">Create</button>
            
        </form>
    )   
}

export default Avatar