import "./Profile.scss";

import { logout } from "../../api/proxyApi";
import { useNavigate } from "react-router-dom";
import { useSlider } from "../../providers/SliderProvider/SliderProvider";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();

  const { setVisibility } = useSlider();

  useEffect(() => {
    setVisibility(true);
  }, []);

  return (
    <div className="buttons-panel">
      <button
        className="achievements-button"
        onClick={() => navigate("/profile/achievements")}
      >
        Achievements
      </button>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;
