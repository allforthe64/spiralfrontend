import { FC } from "react"
import { Link } from "react-router-dom"

interface ResourceProps {
    id: string,
    name: string,
    link: string,
    desc: string,
    tags: Array<string>,
    tutorials: Array<Object>,
    admin: boolean
    onClickFunc: (id: string) => void
}


const ResourceCard:FC<ResourceProps> = (props) => {

    //Shorten descriptions if necessary
    const desc = props.desc.split(' ')
    let shortDesc = ''

    if (desc.length > 15) {
        for (let i = 0; i < 15; i ++) {

            if (i !== 14) {
                shortDesc += desc[i] + ' '
            } else {
                shortDesc += desc[i] + '...'
            }
        }

    }

    return (
        <div className="w-3/12 p-4 mb-20 h-[250px] border-b border-white ml-10 transition 
            duration-300 ease-in-out transform hover:scale-110 card" onClick={() => props.onClickFunc(props.id)}>
            <div className="h-60 mb-4">
                <p className="text-white info-txt font-bold text-3xl text-left mb-4 card-heading ease-out">{props.name}</p>
                <p className="text-white info-txt text-left w-11/12 mb-10">{shortDesc !== '' ? shortDesc : props.desc}</p>
            </div>
            {props.admin && 
                <Link to={`${props.id}`} className='resourceButton' >Edit</Link>
            }
            </div>
    )
}

export default ResourceCard