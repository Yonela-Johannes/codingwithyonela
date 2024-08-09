import { AiFillEdit } from "react-icons/ai";

export default function UploadButton({
  onUploadComplete,
})
{

  async function upload(ev)
  {
    const target = ev.target;
    if (target.files?.length)
    {
      const file = target.files[0];
      const formData = new FormData;
      formData.set('file', file);

    }
  }

  return (
    <>
      <label className="bg-white shadow-sm shadow-black/30 p-2 cursor-pointer rounded-lg flex gap-1 items-center">
        <AiFillEdit icon={faPencil} />
        <input className="hidden" type="file" onChange={ev => upload(ev)} />
      </label>
    </>
  );
}