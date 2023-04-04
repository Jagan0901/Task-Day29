import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../students_API";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Loading } from "../Components/Loading";




export function ViewStudents() {
  const [students,setStudents]= useState(null);

  const getStudents = ()=>{
    fetch(`${API}/students`,{method:"GET"})
    .then((res)=> res.json())
    .then((data)=> setStudents(data))
  }


  useEffect(()=> getStudents(),[])
  return (
    students ?
    <div>
    <div className='student-card'>
      {students.map((student)=> <Student key={student.id} student={student} refresh={getStudents}/>)}
    </div>
    </div>
    : <Loading/>
  )
}


function Student({student,refresh}){
        
   const deleteStudent = ()=>{
    fetch(`${API}/students/${student.id}`,{method: "DELETE"})
    .then(()=> refresh())
   }
   const navigate = useNavigate();

  return(
    <div style={{'marginTop':'20px'}}>
             <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={student.image}
        title={student.name}
        className='pic'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {student.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Department : {student.department}
        </Typography>
      </CardContent>
      <CardActions className='btn'>
        
      <IconButton  color="secondary" onClick={()=> navigate(`/students/view/${student.id}`)}>
      <EditIcon ></EditIcon>
      </IconButton>

      <IconButton  color="error" onClick={deleteStudent}>
      <DeleteIcon></DeleteIcon>
      </IconButton>
        
        
      </CardActions>
    </Card>
        </div>
  )
}