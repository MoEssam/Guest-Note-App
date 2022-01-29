import React, { useState } from "react";
import axios from "axios";

function Notes() {
  const [noteType, setNoteType] = useState("");
  const [file, setFile] = useState("");

  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };

  const addNotes = async (e) => {
    e.preventDefault();
    const myStorage = window.localStorage;
    const userid = myStorage.getItem("userId");
    const data = new FormData();

    data.append("user_id", userid);
    data.append("title", e.target[0].value);
    data.append("message", e.target[1].value);
    data.append("note_type", e.target[3].value.split(":")[0]);
    data.append("file", file);

    const addNote = await axios.post(`http://localhost:4000/add-note`, data);
    console.log(addNote);
  };

  const getNoteType = async (e) => {
    e.preventDefault();
    const allNoteType = await axios.get(`http://localhost:4000/notetypes`);
    console.log(allNoteType);
    setNoteType(allNoteType.data);
  };

  return (
    <div>
      <h2>Add note</h2>
      <form onSubmit={addNotes}>
        <label className="label">title</label>
        <input className="input" type="text" id="title" name="title" />

        <label className="label">message</label>
        <input className="input" type="text" id="message" name="message" />

        <input type="file" id="file" name="file" onChange={onChangeHandler} />

        <select onClick={getNoteType} id="note" name="note">
          {noteType &&
            noteType.map((note, index) => (
              <option key={index}>
                {note.id}:{note.type}
              </option>
            ))}
        </select>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Notes;
