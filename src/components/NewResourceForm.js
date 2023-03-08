import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { TAGS } from "../config/tags";

const NewResourceForm = ({ func }) => {
    const [name, setName] = useState("")
    const [desc, setDesc] = useState("")
    const [longDesc, setLongDesc] = useState("")
    const [link, setLink] = useState("")
    const [tags, setTags] = useState([''])
    const [tutorial, setTutorial] = useState('')
    const [tutorials, setTutorials] = useState([])
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

    const onTagsChanged = e => {
        console.log(e.target.selectedOptions)
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        console.log(values)
        setTags(values)
    }

    const onTutorialChanged = e => setTutorial(e.target.value)

    const canSaveTutorial = [tutorial.length].every(Boolean)

    const onSaveTutorialClicked = async (e) => {
        e.preventDefault()
        if (canSaveTutorial) {
            setTutorials(prevState => [...prevState, tutorial])
            console.log(`tutorials: ${tutorials}`)
            setTutorial('')
        }
    }

    const options = Object.values(TAGS).map(tag => {
        return (
            <option
                key={tag}
                value={tag}

            > {tag}</option >
        )
    })


    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            const response = await axiosPrivate.post('/resources', 
                JSON.stringify({ name, desc, longDesc, link, tags, tutorials }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }

            )
            
            console.log(response?.data)
        
            //Clear input fields
            setName('')
            setDesc('')
            setLongDesc('')
            setLink('')
            setTags([''])
            setTutorial('')
            setTutorials([])
            func()
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

                <label className="form__label" htmlFor="tags">
                    ASSIGNED TAGS:</label>
                <select
                    id="tags"
                    name="tags"
                    multiple={true}
                    size="3"
                    value={tags}
                    onChange={onTagsChanged}
                >
                    {options}
                </select>
                <div className="text-white">
                    {tutorials}
                </div>
                
                <label className="form__label" htmlFor="tutorial">
                    Tutorial:</label>
                <input
                    id="tutorial"
                    name="tutorial"
                    type="text"
                    autoComplete="off"
                    value={tutorial}
                    onChange={onTutorialChanged}
                />
                <button
                    className="icon-button"
                    title="Tutorial"
                    disabled={!canSaveTutorial}
                    onClick={onSaveTutorialClicked}
                >
                    <FontAwesomeIcon icon={faSave} />
                </button>

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

export default NewResourceForm