import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../api/axios";

const Avatar = () => {
    
    const { auth } = useAuth()
    const id = auth.id

    const [user, setUser] = useState();
    const [edit, setEdit] = useState(false);
    
    useEffect(() => {
        console.log('here')
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            console.log('trying to get user')
            try {
                const response = await axiosPrivate.get(`/users/${id}`, 
                {
                    signal: controller.signal,
                });
                const foundUser = response.data
                console.log(`found user: ${foundUser.imageUrl}`)
                isMounted && setUser(foundUser);
                console.log(`user is now ${foundUser.imageUrl}`)
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const flipButton = () => {
        setEdit(!edit)
    }

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

            const response = await axiosPrivate.post(`https://spiral-backend-api.onrender.com/users/${id}`, 
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
        <div className="flex flex-col justify-center items-center h-full">
            {user?.imageUrl ? <img className="w-8/12 mb-10" src={user.imageUrl} alt="user avatar" />
                            : <img className="w-6/12 h-6/12 mb-10" src="user_white.png" alt="default avatar" />}
            {!edit && <div onClick={flipButton} className="cursor-pointer info-txt font-bold mb-12 bg-alien-green py-px px-8 rounded-md text-black">Edit</div> }
            {edit && <form className="w-full" enctype="multipart/form-data" onSubmit={submitForm}>
            
                <div className="mb-4">
                    <input onChange={handleImage}  type="file" id="formupload" name="file" className="w-10/12 py-px px-8 rounded-md"  />
                    <label className="form-label" htmlFor="form4Example2"></label>
                </div>
                <div classname="flex flex-row justify-around">
                    <button  type="submit" className="inline-block info-txt font-bold mb-12 bg-alien-green py-px px-8 rounded-md text-black">Update</button>
                    <div onClick={flipButton} className="inline-block cursor-pointer info-txt font-bold mb-12 bg-grey py-px px-8 rounded-md text-black w-4/12 ml-2">Cancel</div>
                </div>
            </form>}
        </div>            
    )   
}

export default Avatar