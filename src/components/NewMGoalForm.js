import { useState} from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const NewMGoalForm = () => {
    
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
            const response = await axiosPrivate.post('/mgoals', 
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
            <div>
                <h2>Make New Monthly Goal</h2>
                <h4 className="text-white">User: {auth.user}</h4>
            </div>
            <form onSubmit={handleSubmit} className="text-black row g-3">
                <div className="col-md-3">
                    <label className="form-label">Title </label>
                    <input
                    type="text"
                    name="title"
                    className="form-control p-2"
                    onChange={(e) => handleTitle(e)}
                    value={title}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Text</label>
                    <input
                    type="text"
                    name="text"
                    className="form-control p-2"
                    onChange={(e) => handleText(e)}
                    value={text}
                    />
                </div>

                <div className="col-md-3">
                    <button type="submit" className="btn btn-primary mt-4">
                    Submit
                    </button>
                </div>
            </form>
            <Link to={'/dashboard'}>Return to dashboard</Link>
        </>
    );
};

export default NewMGoalForm