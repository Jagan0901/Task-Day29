import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../students_API";
import { Loading } from "../Components/Loading";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export function EditStudent() {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const getStudent = () => {
      fetch(`${API}/students/${studentId}`, { method: "GET" })
        .then((res) => res.json())
        .then((data) => setStudent(data));
    };
    useEffect(() => getStudent(), []);
  
    return student ? <EditForm student={student} /> : <Loading />;
  }
  
  function EditForm({ student }) {
    const [name, setName] = useState(student.name);
    const [pic, setPic] = useState(student.image);
    const [department, setDepartment] = useState(student.department);
  
    const navigate = useNavigate();
  
    const editStudent = () => {
      const updatedStudent = {
        name: name,
        image: pic,
        department: department
      };
  
      fetch(`${API}/students/${student.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedStudent),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(() => navigate("/students/view"));
    };
    return (
      <div className="add-student">
        <TextField
          id="outlined-basic"
          label="student name"
          variant="outlined"
          type="text"
          onChange={(event) => setName(event.target.value)}
          value={name}
          placeholder="Enter a name"
        />
  
        <TextField
          id="outlined-basic"
          label="student image"
          variant="outlined"
          type="text"
          onChange={(event) => setPic(event.target.value)}
          value={pic}
          placeholder="Enter a image URL"
        />
  
        <TextField
          id="outlined-basic"
          label="student department"
          variant="outlined"
          type="text"
          onChange={(event) => setDepartment(event.target.value)}
          value={department}
          placeholder="Enter the department"
        />
  
        <Button variant="contained" color="success" onClick={editStudent}>
          SAVE
        </Button>
      </div>
    );
  }
