import { FC } from "react"

interface ResourceProps {
    id: string,
    name: string,
    link: string,
    desc: string,
    tags: Array<string>
    onClickFunc: (id: string) => void
}


const ResourceCard:FC<ResourceProps> = (props) => {

    return (
        <div className="w-3/12 p-4 mb-20 h-[250px] border-b border-white ml-10 transition 
            duration-300 ease-in-out transform hover:scale-110 card" onClick={() => props.onClickFunc(props.id)}>
            <p className="text-white info-txt font-bold text-3xl text-left mb-4 card-heading ease-out">{props.name}</p>
            <p className="text-white info-txt text-left w-10/12 mb-10">{props.desc}</p>
        </div>
    )
}

export default ResourceCard