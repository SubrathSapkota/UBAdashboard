import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import "../styles/calender.css";

// date inports
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { format } from "date-fns";

const CreateInterview = () => {
  const [candidateId, setCandidateId] = useState("");
  const [interviewerId, setInterviewerId] = useState("");
  const [candidateFName, setCandidateFName] = useState("");
  const [interviewerLName, setInterviewerLName] = useState("");

  const fetchCandidateName = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/user/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching candidate: ${response.statusText}`);
      }
      const data = await response.json();
      setCandidateFName(data.fname);
    } catch (error) {
      console.error("Error fetching candidate name:", error.message);
    }
  };

  const fetchInterviewerName = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/interviewer/${id}`);
      const data = await response.json();
      setInterviewerLName(data.lname);
    } catch (error) {
      console.error("Error fetching interviewer name:", error);
    }
  };

  const addinterviewerHandler = () => {
    fetchCandidateName(candidateId);
    fetchInterviewerName(interviewerId);
  };

  const [calender, setCalender] = useState("");
  const [open, setOpen] = useState(false);
  const refOpenClose = useRef(null);

  useEffect(() => {
    setCalender(format(new Date(), "MM/dd/yyyy"));

    // close claender
    const handleClickOutside = (e) => {
      if (refOpenClose.current && !refOpenClose.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (date) => {
    setCalender(format(date, "MM/dd/yyyy"));
    console.log(date);
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/interview")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="table-container flex-col relative">
      <div className="flex flex-col items-end">
        <div className="flex items-center  gap-5 w-full justify-between px-9">
          <input
            type="text"
            className="  border-black text-gray-900 text-sm rounded-lg block w-250 h-9 p-2.5  "
            placeholder="Candidste ID"
            onChange={(e) => {
              setCandidateId(e.target.value);
            }}
          />
          <input
            type="text"
            className="  border-black text-gray-900 text-sm rounded-lg block w-250 h-9 p-2.5  "
            placeholder="Interviewer ID"
            onChange={(e) => {
              setInterviewerId(e.target.value);
            }}
          />
          <input
            type="text"
            className="  border-black text-gray-900 text-sm rounded-lg block w-250 h-9 p-2.5  "
            value={calender}
            readOnly
            onClick={() => setOpen((open) => !open)}
          />
          <input
            type="text"
            className="  border-black text-gray-900 text-sm rounded-lg block w-20 h-9 p-2.5  "
            placeholder="time"
          />
          <div className="calendarWrap">
            <div ref={refOpenClose}>
              {open && (
                <Calendar
                  date={new Date()}
                  onChange={handleSelect}
                  className="calendarElement"
                />
              )}
            </div>
          </div>

          <Button
            handleClick={addinterviewerHandler}
            btnName="Add Interviewer"
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-200 border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Candidate Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Interviewer Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Date
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Team Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((dataItem) => (
                      <tr
                        key={dataItem._id}
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {dataItem.id}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {dataItem.candidatename}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {dataItem.interviewername}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {dataItem.date}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {dataItem.time}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {dataItem.status}
                        </td>

                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap ">
                          {dataItem.teamname}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <a>Edit /</a>
                          <a> Delete</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div />
    </div>
  );
};

export default CreateInterview;
