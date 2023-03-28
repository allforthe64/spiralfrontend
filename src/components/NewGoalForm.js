import { useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NewForm from "./NewForm";



const NewGoalForm = () => {
    
    const { auth } = useAuth();
    const id = auth.id

    const [title, setTitle] = useState("")
    const [text, setText] = useState("")

    const [message, setMessage] = useState("")
    
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const handleTitle = (event) => {
        const new_title = event.target.value
        setTitle(new_title)
    }

    const handleText = (event) => {
        const new_text = event.target.value
        setText(new_text)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            const response = await axiosPrivate.post('/goals', 
                JSON.stringify({ id, title, text }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            
            console.log(response?.data)
        
            //Clear input fields
            setTitle('')
            setText('')

            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.log('throwing error in frontend goals form')
            if (!err?.response) {
                setMessage('No Server Response')
            } else {
                setMessage('Goal creation Failed')
            }
        }
    }

    return (
        <>
            <NewForm note={false} user={auth.user} submit={handleSubmit} handleTitle={handleTitle} handleText={handleText} title={title} text={text}/>
        </>
    );
};

export default NewGoalForm