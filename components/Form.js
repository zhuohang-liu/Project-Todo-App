import React, { useState, useContext, useEffect } from 'react';
import { useCollapse } from 'react-collapsed';
import TodoContext from './context';


export default function Form({display_entry, fmode}) {
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const display_title = display_entry.title, display_date = display_entry.date, display_time = display_entry.time;

    const { checkTodos, addTodos, editTodos } = useContext(TodoContext);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [titleError, setTitleError] = useState("");
    const [datetimeError, setDateTimeError] = useState("");

    const [mode, setMode] = useState("add");

    const [submitOrnot, setSubmitOrnot] = useState("submit");

    useEffect(()=> {
        setTitle(display_title);
        setDate(display_date);
        setTime(display_time);
        setMode(fmode);

    }, [display_entry, fmode]);

    const generateKey = (date, time, title) => {
        if(date === "") date = "-1";
        if(time === "") time = "-1";
        var key = date + "T" + time + "_" + title;
        return key;
    }

    const clearFields = () => {
        setTitle("");
        setDate("");
        setTime("");
    }

    const submit = () => {
        if(title === "") {
            setTitleError("Title cannot be empty.");
            return;
        } else {
            setTitleError("");
        }

        if(date === "" && time !== "") {
            setDateTimeError("Date must be provided if time is set.");
            return;
        } else {
            setDateTimeError("");
        }
        
        var key = generateKey(date, time, title);
        if(!checkTodos(key, date)) {
            setDateTimeError("An event with identical time and title already exists.");
            return;
        } else {
            setDateTimeError("");
        }

        if (mode === "add") {
            addTodos(key, {date: date, time: time, title: title, notified: false});
        }
        else if (mode === "edit") {
            let display_entryid = generateKey(display_date, display_time, display_title);
            editTodos(display_entryid, display_date, key, {date: date, time: time, title: title, notified: false});
            setMode("add");
        }

        clearFields();
            
    }

    const fsubmit = (event) => {
        event.preventDefault();
        if (submitOrnot === "submit") {
            submit();
        }

        setSubmitOrnot("submit");
    }

    return (
        <form className="collapsible" onSubmit={fsubmit}>
            <input type="text" value={title} placeholder="Have a task in mind?" onChange={v => setTitle(v.target.value.trim())}/>
            <div className="header" {...getToggleProps()}>
                <div>
                    <div className={isExpanded ? "upArrow" : "downArrow"}/>
                </div>
            </div>
            <div className="title-error">{titleError}</div>
            <div {...getCollapseProps()}>
                <label className="switch">
                    <input type="checkbox"/>
                    <span className="slider round"/>
                </label><br/>
                
                <input type="date" id="date" name="date" value={date} onChange={v => setDate(v.target.value.trim())}/><br/>
                <input type="time" id="time" name="time" value={time} onChange={v => setTime(v.target.value.trim())}/>
            </div>
            <div className="datetime-error">{datetimeError}</div>
            <div className="d-flex flex-row mb-3">
                <input className="me-auto h-75" type="submit" id="submit" name="submit"/>
                <button className="p-2" onClick={() => {
                    setMode("add");
                    setSubmitOrnot("notSubmit");
                }}>Cancel</button>
                <button className="p-2" onClick={() => {
                    clearFields();
                    setSubmitOrnot("notSubmit");
                }}>Clear</button>
            </div>
        </form>
    );
}