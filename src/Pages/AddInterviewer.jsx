import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const AddInterviewer = () => {
  const [user, setUser] = useState({
    id: generateId(),
    fname: "",
    lname: "",
    mname: "",
    age: "",
    email: "",
    gender: "",
    teamname: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User data submitted:", user);
    setUser({
      id: generateId(),
      fname: "",
      lname: "",
      mname: "",
      age: "",
      email: "",
      gender: "",
      teamname: "",
    });
  };

  const navigate = useNavigate();

  // backend connections through cors
  const PostintData = async (e) => {
    e.preventDefault();

    const { fname, mname, lname, age, gender, email, teamname } = user;

    const res = await fetch("http://localhost:4000/interviewer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        mname,
        lname,
        age,
        gender,
        email,
        teamname,
      }),
    });

    const msgData = await res.json();

    if (msgData.status === 422 || !msgData) {
      window.alert("Invalid Not Added");
    } else {
      window.alert("Succussfully Added..");

      navigate("/interviewer");
    }
  };

  return (
    <>
      <div className="container flex justify-center items-center">
        <div className="w-full lg:w-1/2 py-16 px-12 ">
          <h2 className="text-3xl text-center mb-9">Add Users</h2>

          <form action="#" onSubmit={handleSubmit} method="POST">
            <div className="grid grid-cols-3 gap-5">
              <input
                type="text"
                placeholder="Firstname"
                className="border border-gray-400 py-1 px-2"
                name="fname"
                value={user.fname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Middle Name"
                className="border border-gray-400 py-1 px-2"
                name="mname"
                value={user.mname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-400 py-1 px-2"
                name="lname"
                value={user.lname}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <input
                type="number"
                placeholder="Age"
                className="border border-gray-400 py-1 px-2 w-full"
                name="age"
                value={user.age}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <input
                type="string"
                placeholder="email"
                className="border border-gray-400 py-1 px-2 w-full"
                name="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5">
              <select
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="border border-gray-400 py-1 px-2 w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mt-5">
              <input
                name="teamname"
                type="text"
                placeholder="Team Name"
                className="border border-gray-400 py-1 px-2 w-full"
                value={user.teamname}
                onChange={handleChange}
              />
            </div>

            <div className="mt-5 flex gap-5 justify-end">
              <Button
                className="w-full bg-purple-500 py-3 text-center text-white"
                btnName="Add Interviewer"
                handleClick={PostintData}
              />
              <Button
                type="button"
                handleClick={() => navigate("/users")}
                btnName="Back"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddInterviewer;
