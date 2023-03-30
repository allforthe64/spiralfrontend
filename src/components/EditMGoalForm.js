import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import EditForm from './EditForm'


const EditMGoalForm = ({ goal }) => {
    const { id } = useParams()

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [title, setTitle] = useState(goal.title)
    const [text, setText] = useState(goal.text)

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)

    const canSave = [title, text].every(Boolean)

    const onSaveMGoalClicked = async (e) => {
        e.preventDefault()
        try {
            // Axios response is in JSON
            const response = await axiosPrivate.put('/mgoals', 
                JSON.stringify({ id, title, text }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data)
            console.log(`updated monthyl goal: ${title}`)
            
            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.log('throwing error in edit monthly goal form')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('Monthly Goal update Failed')
            }
        }
    }

    const onDeleteMGoalClicked = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            console.log(`sending id: ${id}`)

            const response = await axiosPrivate.delete('/mgoals', 
            {
                headers: { 
                    'Content-Type': 'application/json' },
                    withCredentials: true,
                data: {
                  id: id
                }
            })
            
            console.log(response?.data)
            console.log(`deleted monthly goal: ${title}`)
            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.log('throwing error in edit monghtly goal form')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('Goal change Failed')
            }
        }
    }
    
    let deleteMButton = (
        <button
            className="icon-button text-3xl transition 
            duration-300 ease-in-out transform hover:scale-110"
            title="Delete"
            onClick={onDeleteMGoalClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )

    let saveMButton = (
        <button
            className="icon-button text-3xl transition 
            duration-300 ease-in-out transform hover:scale-110"
            title="Save"
            onClick={onSaveMGoalClicked}
            disabled={!canSave}
        >
            <FontAwesomeIcon icon={faSave} />
        </button>
    )

    const content = (
        <>
            <EditForm note={false} topTitle={goal.title} title={title} titleChange={onTitleChanged} text={text} textChange={onTextChanged} save={saveMButton} del={deleteMButton}/>
        </>
    )
  return content
}

export default EditMGoalForm