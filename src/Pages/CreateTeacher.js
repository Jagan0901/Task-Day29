import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { API } from './../teachers_API';
import { useNavigate } from 'react-router-dom';




export  function CreateTeacher() {
  const [id,setId] = useState("");
  const [name,setName] = useState("");
  const [pic,setPic]  = useState("");
  const [department,setDepartment] = useState("");
  const [experience,setExperience] = useState("");

  const navigate = useNavigate();


  const addTeacher = ()=>{

    const newTeacher ={
      id:id,
      name:name,
      image:pic,
      department:department,
      experience:experience
    }


    fetch(`${API}/teachers`,{
      method:"POST",
      body: JSON.stringify(newTeacher),
      headers: {"Content-type" : "application/json" }
    })
    .then((res)=> res.json())
    .then(()=> navigate('/teachers/view')) 
  }

return (
  <div className='form'>
     <TextField
      id="outlined-basic"
      label="Teacher id"
      variant="outlined"
      type="number"
      onChange={(event) => setId(event.target.value)}
      placeholder='Enter any id' />

     <TextField
      id="outlined-basic"
      label="Teacher Name"
      variant="outlined"
      type="text"
      onChange={(event) => setName(event.target.value)}
      placeholder='Enter teacher name' />

     <TextField
      id="outlined-basic"
      label="Teacher image URL"
      variant="outlined"
      type="text"
      onChange={(event) => setPic(event.target.value)}
      placeholder='Enter teacher image URL' />

     <TextField
      id="outlined-basic"
      label="Teacher Department"
      variant="outlined"
      type="text"
      onChange={(event) => setDepartment(event.target.value)}
      placeholder='Enter teacher department' />

     <TextField
      id="outlined-basic"
      label="Teacher Experience"
      variant="outlined"
      type="number"
      onChange={(event) => setExperience(event.target.value)}
      placeholder="Enter teacher's no. of years experience" />

    <Button variant='contained' onClick={addTeacher}>
      Create 
    </Button>
  </div>
)
}
