import { useState } from "react";
import toast from "react-hot-toast";
import UploadButton from "../shared/UploadButton";
import { AiFillSave } from "react-icons/ai";

export default function ProfileInfoForm()
{
  const [coverUrl, setCoverUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  async function handleFormAction(formData)
  {
    // await saveProfile(formData);
    toast.success('Profile saved!');
  }

  return (
    <form action={handleFormAction}>
      <div className="relative border bg-gray-100 rounded-lg h-48 mb-4">
        <img
          src={coverUrl || ''}
          alt="cover image"
          width={1024}
          height={1024}
          className="w-full h-48 object-cover object-center rounded-lg"
        />
        <div className="absolute left-4 -bottom-4 z-10 border bg-gray-100 size-24 rounded-lg">
          <div className="rounded-lg size-24 overflow-hidden">
            <img
              src={avatarUrl || ''}
              alt="avatar"
              width={120}
              height={120}
            />
          </div>
          <div className="absolute -bottom-2 -right-2">
            <UploadButton onUploadComplete={setAvatarUrl} />
          </div>
          <input type="hidden" name="avatarUrl" value={avatarUrl} />
        </div>
        <div className="absolute right-2 bottom-2">
          <UploadButton onUploadComplete={setCoverUrl} />
          <input type="hidden" name="coverUrl" value={coverUrl} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="input-label" htmlFor="usernameIn">username</label>
          <input
            defaultValue={profileInfo?.username}
            name="username"
            id="usernameIn"
            type="text" placeholder="username" />
        </div>
        <div>
          <label className="input-label" htmlFor="displayNameIn">display name</label>
          <input
            defaultValue={profileInfo?.displayName}
            name="displayName"
            id="displayNameIn"
            type="text" placeholder="display name" />
        </div>
      </div>
      <div>
        <label className="input-label" htmlFor="bioIn">bio</label>
        <textarea
          defaultValue={profileInfo?.bio}
          id="bioIn"
          name="bio"
          placeholder="bio"></textarea>
      </div>
      <div className="flex justify-between">
        <button className="mt-4 bg-yellow-300 px-4 py-2 rounded-lg flex gap-2 items-center">
          <AiFillSave />
          Save profile
        </button>
      </div>
    </form>
  );
}