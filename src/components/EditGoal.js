import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import EditGoalForm from './EditGoalForm'
import useAxiosPrivate from '../hooks/useAxiosPrivate'



const EditGoal = () => {

    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();


    const { id } = useParams()
    console.log(`got the goal id ${id}`)

    const [goal, setGoal] = useState()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getGoal = async () => {

            try {
                const response = await axiosPrivate.get('/goals', 
                {
                    signal: controller.signal,
                });
                const foundGoal = response.data.filter(el => el._id === id)[0]
                //console.log(`found goal: ${foundGoal.title}`)
                isMounted && setGoal(foundGoal);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getGoal();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    if (!goal) return <p>No Goal found</p>

    const content = <EditGoalForm goal={goal} />

    return content
}
export default EditGoal