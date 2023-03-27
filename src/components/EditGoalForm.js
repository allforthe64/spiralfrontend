import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import EditForm from './EditForm'



const EditGoalForm = ({ goal }) => {
    const { id } = useParams()

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [title, setTitle] = useState(goal.title)
    const [text, setText] = useState(goal.text)
    const completed = goal.completed

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)

    const canSave = [title, text].every(Boolean)

    const onSaveGoalClicked = async (e) => {
        e.preventDefault()
        try {
            // Axios response is in JSON
            const response = await axiosPrivate.put('/goals', 
                JSON.stringify({ id, title, text, completed }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data)
            console.log(`updated goal: ${title}`)
            
            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.log('throwing error in edit goal form')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('Goal update Failed')
            }
        }
    }

    const onDeleteGoalClicked = async (e) => {
        e.preventDefault()

        try {
            // Axios response is in JSON
            console.log(`sending id: ${id}`)

            const response = await axiosPrivate.delete('/goals', 
            {
                headers: { 
                    'Content-Type': 'application/json' },
                    withCredentials: true,
                data: {
                  id: id
                }
            })
            
            console.log(response?.data)
            console.log(`deleted goal: ${title}`)
            navigate('/dashboard', { replace: true })
        } catch (err) {
            console.log('throwing error in edit goal form')
            if (!err?.response) {
                console.log('No Server Response')
            } else {
                console.log('Goal change Failed')
            }
        }
    }
    
    let deleteButton = (
        <button
            className="icon-button text-3xl transition 
            duration-300 ease-in-out transform hover:scale-110"
            title="Delete"
            onClick={onDeleteGoalClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )

    let saveButton = (
        <button
            className="icon-button text-3xl transition 
            duration-300 ease-in-out transform hover:scale-110"
            title="Save"
            onClick={onSaveGoalClicked}
            disabled={!canSave}
        >
        <FontAwesomeIcon icon={faSave} />
    </button>
    )

    const content = (
        <>
            <EditForm goalTitle={goal.title} title={title} titleChange={onTitleChanged} text={text} textChange={onTextChanged} save={saveButton} del={deleteButton}/>
        </>
        
    )
  return content
}

export default EditGoalForm