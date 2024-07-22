import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiUrl } from '../constants/base_urls'

const Verify = () =>
{
    const [user, setUser] = useState()
    const { token } = useParams()
    const { theme } = useContext(ThemeContext)
    console.log(token)

    useEffect(() =>
    {
        const fetchUserData = async () =>
        {
            if (token)
            {
                const res = await axios.get(`${apiUrl}/confirm_email/${token}`)
                console.log(res)
            }
            fetchUserData()
        }
    }, [token])

    return (
        <div className={`${theme == "light" ? "text-black" : "text-white"}`}>
            <p>Verify Acount</p>
            {/* <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div> */}

            {/* <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button> */}
        </div>
    );
};

export default Verify;
