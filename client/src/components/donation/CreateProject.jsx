import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const CreateProject = () =>
{
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')

  const toTimestamp = (dateStr) =>
  {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault()
    if (!title || !description || !cost || !date || !imageURL) return

    const params = {
      title,
      description,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
    }

    // await createProject(params)
    // toast('Project created successfully, will reflect in 30sec.')
    onClose()
  }

  const onClose = () =>
  {
    setGlobalState('createModal', 'scale-0')
    reset()
  }

  const reset = () =>
  {
    setTitle('')
    setCost('')
    setDescription('')
    setImageURL('')
    setDate('')
  }

  return (
    <div
      className={` w-full h-full flex
    items-center justify-center 
    transform transition-transform duration-300`}
    >
      <div
        className="
        rounded-sm w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-md mt-5"
          >
            <input
              className="block w-full text-sm  focus:outline-none
            focus:ring-0"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-md mt-5"
          >
            <textarea
              className="block w-full text-sm  focus:outline-none
            focus:ring-0"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 font-medium text-md leading-tight
            rounded-md mt-5"
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
