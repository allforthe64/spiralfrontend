import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const FieldValid = (props) => {
    
    return (
        <div className="w-[10%]">
            <label htmlFor="confirm_pwd">
                <FontAwesomeIcon icon={faCheck} className={props.exp1} />
                <FontAwesomeIcon icon={faTimes} className={props.exp2} />
            </label>
        </div>
    )
}

export default FieldValid