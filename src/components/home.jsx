import {useState, useEffect} from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon  from  '@mui/icons-material/Edit';
import {Link} from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(6),  
  color: theme.palette.text.secondary,
}));


export const Home = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState()

    const itemsPerPage = 5;


    useEffect(() => {
        fetchData();
    },[currentPage]);


    const fetchData = () => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${itemsPerPage}`).then((res)=> {setUsers(res.data);setTotalPages(res.headers["x-total-count"])});
    }


    const handleDel = (e) => {
      axios.delete(`https://jsonplaceholder.typicode.com/posts/${e.target.value}`).then((json) => console.log(json));;
    }
    
    const handlePagination = (e,value) => {
      // console.log(value);
      setCurrentPage(value);
    }


    return(
        <div>
            <div style = {{display:"flex", justifyContent: "center", alignItems: "center",gap:"10px"}}>
            <h1>Home</h1>
            <img width="45vw" height="45vh"src = "https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/home-page-161.png"></img>
            </div>
            <div style = {{display:"flex", justifyContent: "center"}}>
            <Box sx={{ width: '50%' }} >
              <Stack spacing={2}>
                {users.map((user, index) => {
                  return (
                    <Item key={index} style = {{textAlign: 'left'}}>
                      <div style = {{display:"flex", justifyContent: "space-between"}} >
                          <div>
                            <span>ID: {user.id},</span>
                            <span> USER_ID: {user.userId}</span>
                          </div>
                          <div style = {{display:"flex", gap:"4px"}}>
                          <Link to = {`/update/${user.id}`} style = {{textDecoration:"none"}}><Button  variant="outlined" endIcon={<EditIcon />}>Edit</Button></Link>
                          <Button  onClick = {handleDel}  value = {user.id}  variant="outlined" endIcon={<DeleteIcon />}>Delete</Button>
                          </div>
                      </div>
                      <h2>Title: {user.title}</h2>
                      <p>Post: {user.body}</p>
                      

                    </Item>
                  );
                })}
                
              </Stack>
            
            </Box>
            </div>
            <div style = {{display:"flex",justifyContent:"center",alignItems:"center",margin:"30px",marginBottom:"60px"}}>
                <Pagination onChange = {handlePagination} count={totalPages/itemsPerPage} color="primary"  />
            </div>
        </div>
    )
}



