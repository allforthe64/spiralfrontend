import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const InfoNote = (props) => {
    
    let characters;

    if (props.line4) {
        characters = [
            <span aria-label="exclamation mark">! </span>,
            <span aria-label="at symbol">@ </span>,
            <span aria-label="hashtag"># </span>,
            <span aria-label="dollar sign">$ </span>,
            <span aria-label="percent">%</span>
        ]
    }

    return (
        <p id={props._id} className={props.exp1}>
            <FontAwesomeIcon icon={faInfoCircle} />
            {[props.line1, <br/>]}
            {props.line2 && 
                [props.line2,
                <br/>]
            }
            {props.line3 && 
                props.line3
            }
            {characters}
        </p>
    )
}

export default InfoNote