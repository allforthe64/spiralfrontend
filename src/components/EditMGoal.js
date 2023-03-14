import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import EditMGoalForm from './EditMGoalForm'
import useAxiosPrivate from '../hooks/useAxiosPrivate'



const EditMGoal = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    const { id } = useParams()
    console.log(`got the monthly goal id ${id}`)

    const [mgoal, setMGoal] = useState()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getMGoal = async () => {

            try {
                const response = await axiosPrivate.get('/mgoals', 
                {
                    signal: controller.signal,
                });
                const foundMGoal = response.data.filter(el => el._id === id)[0]
                //console.log(`found goal: ${foundGoal.title}`)
                isMounted && setMGoal(foundMGoal);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getMGoal();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    if (!mgoal) return <p>No Monthly Goal found</p>

    const content = <EditMGoalForm goal={mgoal} />

    return content
}
export default EditMGoal