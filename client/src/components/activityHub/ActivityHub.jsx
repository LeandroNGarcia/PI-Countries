import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setActivities } from "../../redux/actions/actions"
import Activity from '../activities/Activity'
import ActivityForm from '../detail/ActivityBar'
import "./ActivityHub.css"

const ActivityHub = ({ navigate, postActivity, handleBackChange, updateActivity }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setActivities())
    }, [])
    const activities = useSelector((state) => state.countries.activities);

    const [form, setForm] = useState(false)

    const handleForm = () => {
        setForm((prev) => !prev)
    }

    useEffect(() => {
        handleBackChange("https://images.pexels.com/photos/3014826/pexels-photo-3014826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
    }, [])

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setPosition({ x: e.pageX, y: e.pageY });
    };

    return (
        <div className='contain-activity-hub' onMouseMove={handleMouseMove} >
            <div className='activity-hub'>
                <h2>Activity Menu</h2>
                <div className='divisor'></div>
                <button onClick={handleForm}>
                    <span class="material-icons">
                        add_circle_outline
                    </span>
                    Agregar Actividad Globalmente
                </button>
                <button onClick={() => navigate("/home")}>
                    <span class="material-icons">
                        home
                    </span>
                    Home</button>
            </div>
            {form &&
                <ActivityForm handleForm={handleForm} postActivity={postActivity} />
            }
                <div className='contain-acts'>
                    {activities.map((a) => (
                        <Activity key={a.id} a={a} navigate={navigate} position={position} handleMouseMove={handleMouseMove} updateActivity={updateActivity} />
                    ))}
                </div>
        </div>
    )
}

export default ActivityHub