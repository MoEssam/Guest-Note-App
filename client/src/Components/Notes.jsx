import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState("");
  const [checked, setChecked] = useState([]);
  const myStorage = window.localStorage;
  const userid = myStorage.getItem("userId");

  const getNotes = async (e) => {
    e.preventDefault();
    console.log("current userid is: ", userid);
    const allNotes = await axios.get(`http://localhost:4000/notes/${userid}`);
    console.log(allNotes);
    setNotes(allNotes.data);
  };

  const handleCheck = async (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
      const updateNotes = await axios.post(
        `http://localhost:4000/readnote/${userid}/${updatedList}`
      );
      console.log(updateNotes);
      console.log(updatedList);
      const allNotes = await axios.get(`http://localhost:4000/notes/${userid}`);
      setNotes(allNotes.data);
      console.log(allNotes);
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);

      console.log("moe", updatedList);
    }
    setChecked(updatedList);
  };

  // const handleDelete = (event) => {
  //   var updatedList = [...checked];
  //   if (event.target.checked) {
  //     updatedList = [...checked, event.target.value];
  //     console.log(updatedList);
  //   } else {
  //     updatedList.splice(checked.indexOf(event.target.value), 1);
  //     console.log(updatedList);
  //   }
  //   setChecked(updatedList);
  // };

  const addNotes = async (e) => {
    e.preventDefault();
    const myStorage = window.localStorage;
    const userid = myStorage.getItem("userId");
    const data = new FormData(e.currentTarget);
    console.log(data.get("note").split(":")[0]);
    //note_type: data.get("note").split(":")[0],
  };

  return (
    <div>
      <h2>Get all notes for current user</h2>
      <button type="submit" onClick={getNotes}>
        Get all unread notes for me
      </button>
      <div>
        <form onSubmit={addNotes}>
          <div className="title">Your Notes:</div>
          {notes &&
            notes.map((note, index) => (
              <div key={index}>
                <input
                  id="note"
                  name="note"
                  value={note.id}
                  type="checkbox"
                  onChange={handleCheck}
                />
                <span>
                  {note.title} says {note.message}
                </span>
                {/* <input
                value={note.title}
                type="checkbox"
                onChange={handleDelete}
              /> */}
              </div>
            ))}
          {/* <button className="btn" type="submit">
            MOE
          </button> */}
        </form>
      </div>
      {/* <div>
        {notes &&
          notes.map((note, index) => (
            <p key={index}>
              {note.id}:{note.title} says {note.message}
            </p>
          ))}
      </div> */}
    </div>
  );
}

export default Notes;
