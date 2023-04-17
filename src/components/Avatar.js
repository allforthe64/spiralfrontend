import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { axiosPrivate } from "../api/axios";

const Avatar = () => {
    
    const { auth } = useAuth()
    const id = auth.id

    const [user, setUser] = useState();
    const [edit, setEdit] = useState(false);
    const [currentFile, setCurrentFile] = useState('')
    
    useEffect(() => {
        console.log('here')
        let isMounted = true;
        const controller = new AbortController();
        console.log(controller.signal)

        const getUser = async () => {
            console.log('trying to get user')
            console.log(id)
            try {
                const response = await axiosPrivate.get(`/users/${id}`, 
                {
                    signal: controller.signal,
                }
                );
                console.log(`found user: ${response.data}`)
                const foundUser = response.data
                
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
    }, [currentFile])

    const flipButton = () => {
        setEdit(!edit)
    }

    const [file, setFile] = useState([]);
    
    //const foo = 'bar'

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

            //https://spiral-backend-api.onrender.com/users/${id}
            const response = await axiosPrivate.post(`http://localhost:3500/users/${id}`, JSON.stringify({file}))

            // const {data} = await axiosPrivate.post(`http://localhost:3500/users/${id}`, {file})
            if  (response.success === true){
                setFile('');
                console.log('created avatar')
            }
            console.log(response);
            setCurrentFile(file)
            setEdit(!edit)
        } catch (error) {
            console.log(error)
        }

    }
    
    return (            
        <div className="flex flex-col justify-center items-center h-full">
            {user?.imageUrl ? <img className="w-8/12 mb-4 md:mb-10" src={user.imageUrl} alt="user avatar" />
                            : <img className="w-6/12 h-6/12 mb-4 md:mb-10" src="user_white.png" alt="default avatar" />}
            {!edit && <div onClick={flipButton} className="cursor-pointer info-txt font-bold mb-12 bg-alien-green py-px px-8 rounded-md text-black">Edit</div> }
            {edit && <form className="w-full" encType="multipart/form-data" onSubmit={submitForm}>
            
                <div className="mb-4">
                    <input onChange={handleImage}  type="file" id="formupload" name="file" className="w-10/12 py-px px-8 rounded-md"/>
                    <label className="form-label" htmlFor="form4Example2"></label>
                </div>
                <div className="flex flex-row justify-around">
                    <button  type="submit" className="inline-block info-txt font-bold mb-8 md:mb-12 bg-alien-green py-px px-8 rounded-md text-black">Update</button>
                    <div onClick={flipButton} className="inline-block cursor-pointer info-txt font-bold mb-8 md:mb-12 bg-grey py-px px-8 rounded-md text-black w-4/12 ml-2">Cancel</div>
                </div>
            </form>}
        </div>            
    )   
}

export default Avatar