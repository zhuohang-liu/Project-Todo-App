import React, { useState, useContext } from 'react';
import { useCollapse } from 'react-collapsed';
import TodoContext from './context';

export default function Form() {
    const [visible, setVisible] = useState(false);
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const [titleError, setTitleError] = useState("");
    const [datetimeError, setDateTimeError] = useState("");
    
    const { checkTodos, addTodos } = useContext(TodoContext);

    const generateKey = (date, time, title) => {
        if(date === "") date = "-1";
        if(time === "") time = "-1";
        var key = date + "T" + time + "_" + title;
        return key;
    }

    const submit = (event) => {
        event.preventDefault();
        console.log("submit");
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
        
        addTodos(key, {key: key, date: date, time: time, title: title, notified: false});
    }

    return (
        <form className="collapsible" onSubmit={submit}>
            <input type="text" placeholder="Have a task in mind?" onChange={v => setTitle(v.target.value.trim())}/>
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
                
                <input type="date" id="date" name="date" onChange={v => setDate(v.target.value.trim())}/><br/>
                <input type="time" id="time" name="time" onChange={v => setTime(v.target.value.trim())}/>
            </div>
            <div className="datetime-error">{datetimeError}</div>
            <input type="submit" id="submit" name="submit"/>
        </form>
    );
}