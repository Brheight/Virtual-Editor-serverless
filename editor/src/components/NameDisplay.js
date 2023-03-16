import {useState, useEffect } from "react";
import {TextField, Button, Grid, Stack, Typography} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CancelIcon from '@mui/icons-material/Cancel';

import * as React from 'react';

function NameDisplay(props){
    const [editName, setEditName] =useState("");    
    const [editToken, setEditToken] = useState(false);
    const [visible, setVisible] = useState(false)
   
    
    const checkVisible = () => {
        if (props.items.length > 0) {
            setVisible  
        }
        
    }

    useEffect(() => {
        console.log('check visible')
        checkVisible()
          
        })

    const handleform = (e) => {
        
        
        setEditName(e.target.value);
        
    }
    //console.log(oldName)
    //console.log(editName)
    
    const editNameButtonPressed = (e) => {
        
        //console.log('before')
        //console.log(props.items)
        props.items.map((obj) => {
            
           if (obj.id == e.target.name){
            //console.log(obj.name)
            obj.edittoken = true
            setEditToken(true)
            //console.log(obj.edittoken)
            
           }
        })
        //console.log('after')
        //console.log(props.items)
       /* {props.items.map((item) => {
            console.log(item.name)
        })}*/

    }
    //console.log(editToken);

    const saveNameButtonPressed = (e) => {
        
        //console.log('before')
        //console.log(props.items)
        props.items.map((obj) => {
            
           if (obj.id == e.target.name){
            //console.log(obj.name)
            console.log(obj.id)
            obj.name = editName
            obj.edittoken = false
            setEditToken(false)
            //console.log(editName)
            
           }
        })
        const requestOptions ={
            method: "POST",
            headers: {
              "Content-Type":"application/json",
           },
           body:JSON.stringify({name:editName,
           id_token:e.target.name
            })
        };
        fetch("/api/edit-name", requestOptions).then((response) => response.json()).then((data) => {
          
          console.log(items)
          
        })
    }
    const deleteNameButtonPressed = (e) => {
        
        console.log(e.target.name)
        //console.log(props.items.pop(e.target.name))
        
        //console.log(e.target.name)
        /*
        const requestOptions = {
            method: "DELETE"
        }
        fetch(`delete-name${e.target.name}`, requestOptions).then(
            (response) => {
                if (response.ok) {
                    //console.log('array, index before')
                    //console.log(props.items, e.target.name)
                    props.items.map((obj) =>{
                        if (obj.id == e.target.name){
                             const idx = props.items.indexOf(obj)
                             console.log(e.target.name, idx)
                             props.items.splice(idx, 1)
                        }
                    }
                    )
                    //props.items.splice(e.target.name,1) 
                    //console.log('array after')
                    console.log(props.items)
                    setEditToken(false)
                }
            }
        ) */
        
        const requestOptions ={
            method: "POST",
            headers: {
              "Content-Type":"application/json",
           },
           body:JSON.stringify({id_token:e.target.name
           
            })
        };
        fetch("/api/delete-name", requestOptions).then((response) => {
            if (response.ok) {
                //console.log('array, index before')
                //console.log(props.items, e.target.name)
                props.items.map((obj) =>{
                    if (obj.id == e.target.name){
                         const idx = props.items.indexOf(obj)
                         console.log(e.target.name, idx)
                         props.items.splice(idx, 1)
                    }
                }
                )
                //props.items.splice(e.target.name,1) 
                //console.log('array after')
                console.log(props.items)
                setEditToken(false)
            }})
        .then((data) => {
         
          console.log(data)
          
        })

          //console.log(props.items)

        props.items.map((obj) => {
            
            if (obj.id == e.target.name){
             
             obj.edittoken = false
             
             
            }
         })
       
       
     
    }


    const cancelButtonPressed =(e) =>{
        setEditToken(false);
        props.items.map((obj) => {
            
            if (obj.id == e.target.name){
             
             obj.edittoken = false
             
             
            }
         })
    }
    return (
        <div className="display-wrapper">
            
                    <Grid container spacing ={1}>
                       
                        <Grid item xs = {12} >
                        {props.items.length != 0?

                       <div className="div_before_table">
                      
                        
                        <table>
                            <tbody className="table-body">
                            {props.items.map((item) => {
                return(
                                 <tr className ="table-row">
                                    <td className ="limiter">
                                    <Grid container spacing ={1}>
                       
                                    <Grid item xs = {12} md = {4} >       
                                   { item.edittoken ? <TextField fullWidth type = "text" variant = "outlined"  defaultValue ={item.name} onChange={ handleform}/> :<Typography variant = "body" component ="body"> {item.name}</Typography>  } 
                                   </Grid>
                                 <Grid item xs = {12} md = {8} >
                                    { item.edittoken ?  <Stack direction ="row" spacing={2} sx={{m:1}}>
                                        <Button variant = "contained" disableElevation color="secondary" size="small" name={item.id} endIcon={<CancelIcon />}  onClick ={cancelButtonPressed}>Cancel</Button>
                                        <Button variant = "contained" disableElevation color = "error" size="small" name={item.id} endIcon={<DeleteIcon />} onClick ={deleteNameButtonPressed}>Delete</Button>
                                        <Button variant = "contained" disableElevation color="success"  size ="small" endIcon={<SaveAltIcon />} name={item.id} onClick ={saveNameButtonPressed}>Save</Button>
                                    </Stack> :  <Button disabled ={editToken} variant = "contained" disableElevation color="primary" size ="small" endIcon={<EditIcon />}   name={item.id} onClick ={editNameButtonPressed}>Edit</Button> }
                                    
                                   </Grid>
                                   </Grid> 
                                    </td>
                                   
                                 </tr>
                           )
                
                        })}
                               
                            </tbody>
                        </table>
                       

                        </div>
                        : null }
                       </Grid>
                        
                        </Grid>

           
        </div>
    )
}

export default NameDisplay;