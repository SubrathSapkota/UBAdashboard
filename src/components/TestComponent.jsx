import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const TestComponent = () => {
  const [user, setUser] = useState({
    id: generateId(),
    first_name: "",
    last_name: "",
    middle_name: "",
    age: "",
    gender: "",
    team_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User data submitted:", user);
    // You can further send this user data to API or save in state, etc.
    setUser({
      id: generateId(),
      first_name: "",
      last_name: "",
      middle_name: "",
      age: "",
      gender: "",
      team_name: "",
    });
  };

  const navigate = useNavigate();

  return (
    <div className="container flex justify-center items-center">
      <div className="w-full lg:w-1/2 py-16 px-12 ">
        <h2 className="text-3xl text-center mb-9">Add Users</h2>

        <form action="#" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-5">
            <input
              type="text"
              placeholder="Firstname"
              className="border border-gray-400 py-1 px-2"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Middle Name"
              className="border border-gray-400 py-1 px-2"
              name="middle_name"
              value={user.middle_name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="border border-gray-400 py-1 px-2"
              name="last_name"
              value={user.last_name}
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
              name="team_name"
              type="text"
              placeholder="Team Name"
              className="border border-gray-400 py-1 px-2 w-full"
              value={user.team_name}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5">
            <Button
              className="w-full bg-purple-500 py-3 text-center text-white"
              btnName="Add User"
            />
          <Button type="button" handleClick={() => navigate('/users')} btnName="Back"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestComponent;
