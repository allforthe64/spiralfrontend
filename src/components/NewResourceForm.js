import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, Link } from "react-router-dom";

const ResourceForm2 = () => {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [longDesc, setLongDesc] = useState("")
    const [link, setLink] = useState("")
    const [message, setMessage] = useState("")
    
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const handleName = (event) => {
        const new_name = event.target.value
        setName(new_name)
    }

    const handleDesc = (event) => {
        const new_desc = event.target.value
        setDesc(new_desc)
    }

    const handleLongDesc = (event) => {
        const new_longDesc = event.target.value
        setLongDesc(new_longDesc)
    }

    const handleLink = (event) => {
        const new_link = event.target.value
        setLink(new_link)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            const response = await axiosPrivate.post('/resources', 
                JSON.stringify({ name, desc, longDesc, link }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }

            )
            
            console.log(response?.data)
            console.log(JSON.stringify(response))
        
            //Clear input fields
            setName('')
            setDesc('')
            setLongDesc('')
            setLink('')

            navigate('/resources', { replace: true })
        } catch (err) {
            console.log('throwing error in frontend resource form')
            if (!err?.response) {
                setMessage('No Server Response')
            } else {
                setMessage('Resource creation Failed')
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="text-black row g-3">
                <div className="col-md-3">
                    <label className="form-label">Name </label>
                    <input
                    type="text"
                    name="name"
                    className="form-control p-2"
                    onChange={(e) => handleName(e)}
                    value={name}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Desc</label>
                    <input
                    type="text"
                    name="desc"
                    className="form-control p-2"
                    onChange={(e) => handleDesc(e)}
                    value={desc}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Long Desc</label>
                    <input
                    type="text"
                    name="longDesc"
                    className="form-control p-2"
                    onChange={(e) => handleLongDesc(e)}
                    value={longDesc}
                    />
                </div>

                <div className="col-md-3">
                    <label className="form-label">Link</label>
                    <input
                    type="text"
                    name="link"
                    className="form-control p-2"
                    onChange={(e) => handleLink(e)}
                    value={link}
                    />
                </div>

                <div className="col-md-3">
                    <button type="submit" className="btn btn-primary mt-4">
                    Submit
                    </button>
                </div>
            </form>
            <Link to={'/resources'}>Return to resource lists</Link>
        </>
    );
};

export default ResourceForm2