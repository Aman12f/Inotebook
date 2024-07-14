import React from "react";
import { useContext,useState} from "react";
import NoteContext from "../context/notes/NoteContext";

const NoteItem = (props) => {
  const {deleteNote} = useContext(NoteContext)
  const { note,updateNote } = props;
  return (
    <>
      {/* <h3>Hii this is noteitem</h3> */}
      <div className="col-md-3">

      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex justify-content-end">
        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
        <i className="fa-solid fa-trash mx-1" onClick={()=>{deleteNote(note._id)}}></i>

          </div>
          <h5 className="card-title">{note.title }</h5>
          <p className="card-text">
            {note.description}
          </p>
          <p className="card-text">
            {note.tag}
          </p>
          </div>
          </div>
        </div>
    </>
  );
};

export default NoteItem;
