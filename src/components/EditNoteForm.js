import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import EditForm from './EditForm'


const EditNoteForm = ({ note }) => {
    const { id } = useParams()

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)

    const canSave = [title, text].every(Boolean)

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        try {
            // Axios response is in JSON
            const response = await axiosPrivate.put('/notes', 
                JSON.stringify({ id, title, text }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data)
            console.log(`updated note: ${title}`)
            
            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.log('throwing error in edit note form')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('Note update Failed')
            }
        }
    }

    const onDeleteNoteClicked = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            console.log(`sending id: ${id}`)

            const response = await axiosPrivate.delete('/notes', 
            {
                headers: { 
                    'Content-Type': 'application/json' },
                    withCredentials: true,
                data: {
                  id: id
                }
            })
            
            console.log(response?.data)
            console.log(`deleted note: ${title}`)
            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.log('throwing error in edit note form')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('Note change Failed')
            }
        }
    }
    
    let deleteButton = (
        <button
            className="icon-button text-3xl transition 
            duration-300 ease-in-out transform hover:scale-110"
            title="Delete"
            onClick={onDeleteNoteClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )

    let saveButton = (
        <button
            className="icon-button text-3xl transition 
            duration-300 ease-in-out transform hover:scale-110"
            title="Save"
            onClick={onSaveNoteClicked}
            disabled={!canSave}
        >
            <FontAwesomeIcon icon={faSave} />
        </button>
    )

    const content = (
        <>
            <EditForm note={true} topTitle={note.title} title={title} titleChange={onTitleChanged} text={text} textChange={onTextChanged} save={saveButton} del={deleteButton}/>
        </>
    )
  return content
}

export default EditNoteForm