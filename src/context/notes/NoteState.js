import React from 'react'
// import { useContext } from 'react';
import NoteContext from './NoteContext';
import { useState} from 'react';


const NoteState = (props) => {
  
  const host = "http://localhost:5000";
  const [notes_, setNotes] = useState([])
  // const notes1 = [
  //     {
  //       "_id": "667938d516b04264296f599e",
  //       "user": "666454d9a71c55e0323bf511",
  //       "title": "hii this is note 1 ",
  //       "description": "hii this is description 1 ",
  //       "tag": "hii this is tag 1 ",
  //       "date": "2024-06-24T09:13:57.789Z",
  //       "__v": 0
  //     },
  //     {
  //       "_id": "667938e016b04264296f59a1",
  //       "user": "666454d9a71c55e0323bf511",
  //       "title": "hii this is note 2",
  //       "description": "hii this is description 2",
  //       "tag": "hii this is tag 2",
  //       "date": "2024-06-24T09:14:08.930Z",
  //       "__v": 0
  //     },
  //     {
  //       "_id": "667938ec16b04264296f59a4",
  //       "user": "666454d9a71c55e0323bf511",
  //       "title": "hii this is note 3",
  //       "description": "hii this is description 3",
  //       "tag": "hii this is tag 3",
  //       "date": "2024-06-24T09:14:20.414Z",
  //       "__v": 0
  //     },
  //     {
  //       "_id": "6679399616b04264296f59af",
  //       "user": "666454d9a71c55e0323bf511",
  //       "title": "hkjhhkh",
  //       "description": "iuihgvh",
  //       "tag": "iugudtrdfh",
  //       "date": "2024-06-24T09:17:10.135Z",
  //       "__v": 0
  //     }
  //   ]
//     useEffect(() => {
//   setNotes(notes1)
// },[])


  const state = {}
  state.name = "aman"
  state.id="bt21cse212e"

  const deleteNote=async (id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
         "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDU0ZDlhNzFjNTVlMDMyM2JmNTExIn0sImlhdCI6MTcxNzg1MTM4M30.HwihOwE2VkOC7zzXEOHZqVcGRcV2w1qCKiTu1nKacmg"
      },
    });
    // const emptyarray = [];
    const json = await response.json();
    console.log(json);
    if(json.success){
      setNotes((prevNotes)=>prevNotes.filter((note)=>note._id !==id))
    }
    else {
      console.error("Failed to delete note");
    }
  }

  const addNote =async (title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDU0ZDlhNzFjNTVlMDMyM2JmNTExIn0sImlhdCI6MTcxNzg1MTM4M30.HwihOwE2VkOC7zzXEOHZqVcGRcV2w1qCKiTu1nKacmg"
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = await response.json();
    console.log("Note added successfully");
    console.log(json)
    setNotes((prevNotes) => [...prevNotes, json]);
  }
  const fetchNotes = async()=>{
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDU0ZDlhNzFjNTVlMDMyM2JmNTExIn0sImlhdCI6MTcxNzg1MTM4M30.HwihOwE2VkOC7zzXEOHZqVcGRcV2w1qCKiTu1nKacmg"
      },
      // body: JSON.stringify({ username: "example" }),
    });
    const json = await response.json();
    console.log(json)
    setNotes(json)
  }
   
  const updateNotes = async(id,title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      body: JSON.stringify({title,description,tag}),
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY2NDU0ZDlhNzFjNTVlMDMyM2JmNTExIn0sImlhdCI6MTcxNzg1MTM4M30.HwihOwE2VkOC7zzXEOHZqVcGRcV2w1qCKiTu1nKacmg"
     },
    });
    const json = await response.json();
    console.log(json);
    const newNote = JSON.parse(JSON.stringify(notes_))
    for(let i=0;i<newNote.length;i++)
      {
        const element = notes_[i];
        if(element._id===id){
          newNote[i].title= title;
          newNote[i].description= description;
          newNote[i].tag= tag;
          break
        }
      }
        console.log("notes is : ",newNote)
        setNotes(newNote);
      }

  return (
    <NoteContext.Provider value={{state,deleteNote,notes_,addNote,fetchNotes,updateNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
