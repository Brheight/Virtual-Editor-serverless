import { useState, useEffect } from "react";
import AddName from "./AddName";
import NameDisplay from "./NameDisplay";
import React, { Component } from "react";

function Editor() {
  
  const [data, setData] = useState({items:[]})

  

  const addItemToData = (item) =>{
    let items = data["items"];
    //item.id = items.length;
    console.log('print item')
    console.log(item.name)
    console.log(item.edittoken)
    const requestOptions ={
        method: "POST",
        headers: {
          "Content-Type":"application/json",
       },
       body:JSON.stringify({name:item.name,
       edit_token:false
        })
    };
    fetch("/api/add-name", requestOptions).then((response) => response.json()).then((data) => {
      items.push(data);
      console.log(items)
      
    })


  }
  
  const getNamesdb = () =>{
    fetch("/api/view-names").then((response) => response.json())
  .then((data) => {
   //console.log(data)
   //console.log('all data here')
   setData({items:data});
  })
  }
  
  //
  
  useEffect(() =>{
    getNamesdb()
  }, []);
  return (
    <div className="App">
      
      <AddName addItem ={ addItemToData } getNames = {getNamesdb}/>
      <NameDisplay items ={data["items"]}/>
    </div>
  );
}

export default Editor;
