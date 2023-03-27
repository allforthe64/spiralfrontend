import { Link } from 'react-router-dom'

const EditForm = ({goalTitle, title, titleChange, text, textChange, save, del}) => {
    

    return (
        <div className='py-[35px]'>
            <form className="form text-white" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row mb-32">
                    <h2 className='headings font-bold text-5xl'>Editing Goal: {goalTitle}</h2>
                </div>

                <div className='flex justify-around px-20 mb-16'>
                    <div className='flex flex-col w-5/12'>
                        <p className='text-white info-txt font-bold text-2xl mb-10 text-left'>Edit Title:</p>
                        <input
                        id="goal-text"
                        name="title"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter a goal title"
                        className=" bg-inherit border-b-2 outline-0 text-white info-txt text-2xl pl-2 pb-px mb-20 w-9/12"
                        onChange={titleChange}
                        value={title}
                        />
                    </div>

                    <div className='flex flex-col w-5/12'>
                        <p className='text-white info-txt font-bold text-2xl mb-10 text-left'>Edit Goal Text:</p>
                        <textarea
                            id="goal-text"
                            name="text"
                            placeholder="Enter goal description"
                            className="bg-inherit border-2 outline-0 text-white info-txt text-lg p-2 rounded-md"
                            onChange={textChange}
                            value={text}
                            rows='6'
                        />
                    </div>  
                </div>

             

                <div className="form__action-buttons flex justify-center">
                    <div className='flex justify-between w-1/12'>
                        {save}
                        {del}
                    </div>
                </div>

            </form>
            <div className='mt-10'>
                <Link to={'/dashboard'} className='text-white hover:underline'>Return to dashboard</Link>
            </div>
        </div>
    )
}

export default EditForm