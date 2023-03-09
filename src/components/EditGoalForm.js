import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"


const EditGoalForm = ({ goal }) => {
    const { id } = useParams()

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const [title, setTitle] = useState(goal.title)
    const [text, setText] = useState(goal.text)

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)

    const canSave = [title, text].every(Boolean)

    const onSaveGoalClicked = async (e) => {
        e.preventDefault()
        try {
            // Axios response is in JSON
            const response = await axiosPrivate.put('/goals', 
                JSON.stringify({ id, title, text }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            console.log(response?.data)
            console.log(`updated goal: ${title}`)
            
            navigate('/goals', { replace: true })
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
            navigate('/goals', { replace: true })
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
            className="icon-button"
            title="Delete"
            onClick={onDeleteGoalClicked}
        >
            <FontAwesomeIcon icon={faTrashCan} />
        </button>
    )

    const content = (
        <>
            <form className="form text-white" onSubmit={e => e.preventDefault()}>
            <div className="form__title-row">
                <h2>Edit Goal {goal.title}</h2>
                <div className="form__action-buttons">
                    <button
                        className="icon-button"
                        title="Save"
                        onClick={onSaveGoalClicked}
                        disabled={!canSave}
                    >
                        <FontAwesomeIcon icon={faSave} />
                    </button>
                    {deleteButton}
                </div>
            </div>
            <label className="form__label" htmlFor="resource-name">
                Title:</label>
            <input
                className='text-black'
                id="goal-text"
                name="title"
                type="text"
                autoComplete="off"
                value={title}
                onChange={onTitleChanged}
            />

            <label className="form__label" htmlFor="resource-desc">
                Text:</label>
            <textarea
                className='text-black'
                id="goal-text"
                name="text"
                value={text}
                onChange={onTextChanged}
            />      
        </form>
    </>
    )
  return content
}

export default EditGoalForm