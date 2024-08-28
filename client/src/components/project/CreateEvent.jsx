import { useContext, useRef } from 'react';
import { useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'flowbite-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../features/event/eventSlice';

const CreateEvent = () =>
{
    const { loading } = useSelector((state) => state.project);
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useContext(ThemeContext)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [inputData, setInputData] = useState({
        account_id: currentUser?.id,
        title: '',
        description: '',
        start_time: '',
        end_time: '',
    })

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        if (!currentUser?.id || !inputData.title || !inputData.description || !inputData.start_time || !inputData.end_time) return toast("Missing information")
        const formData = new FormData();
        formData.append('account_id', inputData.account_id);
        formData.append('title', inputData.title);
        formData.append('description', inputData.description);
        formData.append('start_time', inputData.start_time);
        formData.append('end_time', inputData.end_time);

        dispatch(createEvent(formData));
        setInputData({
            title: '',
            description: '',
            date: '',
            start_time: '',
            end_time: '',
        })
        toast('Event created successful')
    }

    const handleChange = (e) =>
    {
        setInputData({ ...inputData, [e.target.id]: e.target.value });
    };

    return (
        <div
            className={`${theme == 'light' ? '' : 'border-none'}  w-full h-full flex justify-center 
    transform transition-transform duration-300 ove`}
        >
            <div
                className="
        rounded-sm w-11/12 md:w-2/5 h-7/12 p-6"
            >
                <form onSubmit={handleSubmit} className="flex gap-2 flex-col">
                    <div
                        className="flex justify-between items-center"
                    >
                        <input
                            className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black" : "bg-bg_card "}`}
                            type="text"
                            id="title"
                            value={inputData?.title}
                            name="name"
                            placeholder="Event name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div
                        className="flex justify-between items-center"
                    >
                        <textarea
                            className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black" : "bg-bg_card "}`}
                            type="text"
                            value={inputData.description}
                            id='description'
                            name="description"
                            placeholder="Description"
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="flex flex-col gap-4 justify-between">
                        <div
                            className="flex justify-between items-center"
                        >
                            <input
                                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black" : "bg-bg_card "}`}
                                type="datetime-local"
                                id="start_time"
                                value={inputData.start_time}
                                name="Repo"
                                placeholder="Date"
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div
                            className="flex justify-between items-center"
                        >
                            <input
                                className={`w-full px-3 py-2 mt-1 border ${theme == "light" ? "text-black" : "bg-bg_card "}`}
                                type="datetime-local"
                                id="end_time"
                                value={inputData.end_time}
                                name="Repo"
                                placeholder="Date"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full rounded-none px-3 py-2 mt-1 border bg-bg_lighter ${theme == "light" ? "" : ""} inline-block px-6 py-2.5 font-medium text-md leading-tight mt-5`}
                    >
                        {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                            </>
                        ) : (
                            'Add Event'
                        )}
                    </button>
                </form>
            </div>
        </div >
    )
}

export default CreateEvent
