import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import EditNoteForm from './EditNoteForm'
import useAxiosPrivate from '../hooks/useAxiosPrivate'



const EditNote = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    const { id } = useParams()
    console.log(`got the note id ${id}`)

    const [note, setNote] = useState()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getNote = async () => {

            try {
                const response = await axiosPrivate.get('/notes', 
                {
                    signal: controller.signal,
                });
                const foundNote = response.data.filter(el => el._id === id)[0]
        
                isMounted && setNote(foundNote);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getNote();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    if (!note) return <p>No Note found</p>

    const content = <EditNoteForm note={note} />

    return content
}
export default EditNote