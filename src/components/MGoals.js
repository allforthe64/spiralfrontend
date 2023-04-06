import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const MGoals = () => {
    const { auth } = useAuth()
    const id = auth.id

    const [mgoals, setMGoals] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getMGoals = async () => {

            try {
                const response = await axiosPrivate.get('/mgoals', 
                {
                    signal: controller.signal,
                });
                const results = response.data.filter(el => el.user === id)
                isMounted && setMGoals(results);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }
        getMGoals();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <div className="border-2 p-4 bg-slate-900 border-gray-500 rounded-lg">
                <div className="flex justify-center mb-6 border-b-2 border-white">
                    <div className="flex justify-around w-full md:w-9/12">
                        <h2 className="text-lg md:text-xl lg:text-2xl headings font-bold">Monthly Goals List</h2>
                        <button className="text-base md:text-xl ml-2 sm:ml-0 info-txt font-bold mb-4 sm:mb-12 bg-alien-green py-px px-4 sm:px-8 rounded-md text-black"><Link to={'/mgoals/new'}>Add New Goal</Link></button>
                    </div>
                </div>
                <div className="h-[219px] pt-4 overflow-auto scrollbar">
                    {mgoals?.length ? (
                        <div className="h-[200px] w-11/12 lg:w-9/12 pt-4 pl-8 overflow-auto scrollbar">
                            <ul>
                                {mgoals.map((mgoal) => (
                                    <div className="flex justify-between mb-4">
                                        <li key={mgoal?._id} className="text-white">
                                            <p className="ml-0 md:ml-2 font-bold text-lg sm:text-xl text-left headings">{mgoal?.title}</p>
                                            <p className="ml-0 md:ml-4 mt-4 info-txt text-sm text-left">{mgoal.text}</p>
                                        </li>
                                        <div className="h-[30px]">
                                            <button className="text-red-700 leading-relaxed info-txt font-bold hover:underline text-base sm:text-lg"><Link to={`/mgoals/${mgoal._id}`}>Edit</Link></button>
                                        </div>
                                        
                                    </div>
                                ))}
                            </ul>
                        </div>
                        ) : (
                            <div>
                                <p>No monthly goals to display</p>
                            </div>
                        )}
                </div>
            </div>
        </article>
    );
};

export default MGoals;