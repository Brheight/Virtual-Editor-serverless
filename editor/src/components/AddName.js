import {useState} from "react";
import React, { Component } from "react";
import {TextField, Button, Grid, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
function AddName(props){
    const [name, setName] =useState("");
    

    
    
    const addItemButtonPressed = () => {
        
        name.split(",").map((values) => {
            props.addItem({name:values,edittoken:false});
        })
        props.getNames()
        //console.log(data)
        setName("");
     
    }
    return(
        <div className="main-wrapper">

            <Grid container spacing ={2} >
                <Grid item xs={12} align = "center">
                    <Typography variant ="h4" component = "h4">Add Name(s)</Typography>
                </Grid>
                
                <Grid item xs={12} align = "center">
                
                
                    <TextField 
                        
                        fullWidth sx={{ m: 1 }}
                        type = "text"
                        label = "Name(s)"
                        id="outlined-multiline-static"
                        placeholder = "Enter a name or list of names"
                        value ={name}
                        helperText = "List of names should be in csv format"
                        variant = "outlined"
                        onChange={ (e) => setName(e.target.value)}
                        multiline
                        rows={4}
                        
                        />
                
           
                </Grid>
                <Grid item xs={12} align = "center">
                    
                    <Button variant = "contained" disabled={!name} size ="large" disableElevation color="primary" endIcon={<AddIcon />} onClick ={addItemButtonPressed}>
                        Add Name
                    </Button>
                </Grid>

            </Grid>
             
            
                

            
  
        </div>
    )
}
export default AddName;