import './App.css';
import {Routes,Route,useNavigate} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { CreateStudent } from './Pages/CreateStudent';
import {ViewStudents} from './Pages/ViewStudents';
import {CreateTeacher} from './Pages/CreateTeacher';
import { ViewTeachers } from './Pages/ViewTeachers';
import { Home } from './Pages/Home';
import { EditStudent } from './Pages/EditStudent';
import { EditTeacher } from './Pages/EditTeacher';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={()=> navigate('/student/create')}>Add Student</Button>
          <Button color="inherit" onClick={()=> navigate('/students/view')}>View Students</Button>
          <Button color="inherit" onClick={()=> navigate('/teacher/create')}>Add Teacher</Button>
          <Button color="inherit" onClick={()=> navigate('/teachers/view')}>View Teachers</Button>
        </Toolbar>
      </AppBar>

      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/student/create" element={<CreateStudent/>}/>
          <Route path="/students/view" element={<ViewStudents/>}/>
          <Route path="/students/view/:studentId" element={<EditStudent/>}/>
          <Route path="/teacher/create" element={<CreateTeacher/>}/>          
          <Route path="/teachers/view" element={<ViewTeachers/>}/>
          <Route path="/teachers/view/:teacherId" element={<EditTeacher/>}/>
      </Routes>
    </div>
  );
}

export default App;
