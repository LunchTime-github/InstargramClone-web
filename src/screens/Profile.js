import { useParams } from "react-router";

const Profile = (prop) => {
  const { username } = useParams();
  return <div>profile</div>;
};

export default Profile;
