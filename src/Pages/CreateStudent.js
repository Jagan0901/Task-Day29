import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { API } from '../students_API';
import { useNavigate } from 'react-router-dom';


export function CreateStudent() {
    const [id,setId] = useState("");
    const [name,setName] = useState("");
    const [pic,setPic]  = useState("");
    const [department,setDepartment] = useState("");

    const navigate = useNavigate();

    const addStudent = ()=>{
      const newStudent = {
        id         : id,
        name       : name,
        image      : pic,
        department : department
      }

      fetch(`${API}/students`,{
        method:"POST",
        body: JSON.stringify(newStudent),
        headers : {"Content-type" : "application/json"}
      }).then((res)=> res.json())
        .then(()=> navigate('/students/view'))
    }

  return (
    <div className='form'>
       <TextField
        id="outlined-basic"
        label="Student id"
        variant="outlined"
        type="number"
        onChange={(event) => setId(event.target.value)}
        placeholder='Enter any id' />

       <TextField
        id="outlined-basic"
        label="Student Name"
        variant="outlined"
        type="text"
        onChange={(event) => setName(event.target.value)}
        placeholder='Enter student name' />

       <TextField
        id="outlined-basic"
        label="Student image URL"
        variant="outlined"
        type="text"
        onChange={(event) => setPic(event.target.value)}
        placeholder='Enter student image URL' />

       <TextField
        id="outlined-basic"
        label="Student Department"
        variant="outlined"
        type="text"
        onChange={(event) => setDepartment(event.target.value)}
        placeholder='Enter student department' />

      <Button variant='contained' onClick={addStudent}>
        Create 
      </Button>
    </div>
  )
}
