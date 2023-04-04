import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../teachers_API";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { Loading } from "../Components/Loading";


export function ViewTeachers() {
  const [teachers,setTeachers]= useState(null);

  const getTeachers = ()=>{
    fetch(`${API}/teachers`,{method:"GET"})
    .then((res)=> res.json())
    .then((data)=> setTeachers(data))
  }


  useEffect(()=> getTeachers(),[])
  return (
    teachers ?
    <div>
    <div className='student-card'>
      {teachers.map((teacher)=> <Teacher key={teacher.id} teacher={teacher} refresh={getTeachers}/>)}
    </div>
    </div>
    : <Loading/>
  )
}


function Teacher({teacher,refresh}){
        
   const deleteTeacher = ()=>{
    fetch(`${API}/teachers/${teacher.id}`,{method: "DELETE"})
    .then(()=> refresh())
   }
   const navigate = useNavigate();

  return(
    <div style={{'marginTop':'20px'}}>
             <Card sx={{ maxWidth: 400 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={teacher.image}
        title={teacher.name}
        className='pic'
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {teacher.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Department : {teacher.department}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Experience : {teacher.experience} years
        </Typography>
      </CardContent>
      <CardActions className='btn'>
        
      <IconButton  color="secondary" onClick={()=> navigate(`/teachers/view/${teacher.id}`)}>
      <EditIcon ></EditIcon>
      </IconButton>

      <IconButton  color="error" onClick={deleteTeacher}>
      <DeleteIcon></DeleteIcon>
      </IconButton>
        
        
      </CardActions>
    </Card>
        </div>
  )
}
