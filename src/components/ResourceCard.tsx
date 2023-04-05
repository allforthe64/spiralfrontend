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
        <div className="max-sm:w-9/12 sm:max-md:w-5/12 md:w-3/12 p-4 mb-20 max-sm:ml-0 md:ml-10 transition 
            duration-300 ease-in-out transform hover:scale-110" onClick={() => props.onClickFunc(props.id)}>
            <div className="border-b border-white pb-10 card mb-4">
                <div className="h-60 mb-4">
                    <p className="text-white info-txt font-bold text-3xl text-left mb-4 card-heading ease-out">{props.name}</p>
                    <p className="text-white info-txt text-left w-11/12 mb-10">{shortDesc !== '' ? shortDesc : props.desc}</p>
                </div>
            </div>
            {props.admin && 
                <button className="info-txt font-bold mb-12 bg-alien-green py-px px-8 rounded-md text-black"><Link to={`${props.id}`}>Edit</Link></button>
            }
        </div>
    )
}

export default ResourceCard