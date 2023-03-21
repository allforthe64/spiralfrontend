import { useState } from "react"

const Tag = (props) => {

    const [color, setColor] = useState(false)

    console.log(color)

    return (
        <li className={color === true ? "text-black bg-white text-left" : "text-white text-left"} onClick={() => {
            setColor(!color)
            props.func(props.name)
        }}>{props.name}</li>
    )
}

export default Tag