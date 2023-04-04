import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../teachers_API";
import { Loading } from "../Components/Loading";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export function EditTeacher() {
    const { teacherId } = useParams();
    const [teacher, setTeacher] = useState(null);
    const getTeacher = () => {
      fetch(`${API}/teachers/${teacherId}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => setTeacher(data));
    };
    useEffect(() => getTeacher(), []);
  
    return teacher ? <EditForm teacher={teacher} /> : <Loading />;
  }
  
  function EditForm({ teacher }) {
    const [name, setName] = useState(teacher.name);
    const [pic, setPic] = useState(teacher.image);
    const [department, setDepartment] = useState(teacher.department);
    const [experience, setExperience] = useState(teacher.experience);
  
    const navigate = useNavigate();
  
    const editTeacher = () => {
      const updatedTeacher = {
        name: name,
        image: pic,
        department: department,
        experience: experience
      };
  
      fetch(`${API}/teachers/${teacher.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedTeacher),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => navigate("/teachers/view"));
    };
    return (
      <div className="add-student">
        <TextField
          id="outlined-basic"
          label="teacher name"
          variant="outlined"
          type="text"
          onChange={(event) => setName(event.target.value)}
          value={name}
          placeholder="Enter a name"
        />
  
        <TextField
          id="outlined-basic"
          label="teacher image"
          variant="outlined"
          type="text"
          onChange={(event) => setPic(event.target.value)}
          value={pic}
          placeholder="Enter a image URL"
        />
  
        <TextField
          id="outlined-basic"
          label="teacher department"
          variant="outlined"
          type="text"
          onChange={(event) => setDepartment(event.target.value)}
          value={department}
          placeholder="Enter the department"
        />

        <TextField
          id="outlined-basic"
          label="teacher experience"
          variant="outlined"
          type="number"
          onChange={(event) => setExperience(event.target.value)}
          value={experience}
          placeholder="Enter the experience"
        />        
  
        <Button variant="contained" color="success" onClick={editTeacher}>
          SAVE
        </Button>
      </div>
    );
  }