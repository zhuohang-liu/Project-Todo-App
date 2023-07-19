import { useState, useContext } from 'react';
import TodoContext from './context';
import Entry from './Entry';
import { getDate } from './Utility';

function ModeDisplay({ mode, setMode }) {
    const modes = ["List", "Calendar"];

    const res = [];
    for(let i = 0; i < modes.length; i++) {
        res.push((
            <div className={"mode-selector" + (mode === modes[i] ? " selected" : "")} onClick={() => setMode(modes[i])} key={"modes_" + i}>
                {modes[i]}
            </div>
        ));
    }
    
    return <div>{res}</div>;
}

export default function List() {
    const { todos } = useContext(TodoContext);
    const [ mode, setMode ] = useState("List");

    var res = [];
    if(mode === "List") {
        res.push([...todos.keys()].sort().map(k1 => {
            return [...todos.get(k1).keys()].sort().map(k2 => {
                return (
                    <Entry entry={todos.get(k1).get(k2)} show_date={true} show_time={true} key={"list"+k2} />
                );
            });
        }));
    } else if(mode === "Calendar") {
        const date = new Date();
        for(let i = 0; i < 7; i++) {
            const k1 = getDate(date);
            const curr = [<div key="calendar-idx">{k1}</div>];
            if(todos.get(k1) != undefined) {
                curr.push([...todos.get(k1).keys()].sort().map(k2 => {
                    return (
                        <Entry entry={todos.get(k1).get(k2)} show_date={false} show_time={true} key={"calendar"+k2} />
                    );
                }));
            }

            res.push(<div className="d-flex flex-column m-3" key={"calendar_front"+i}>{curr}</div>);
            date.setDate(date.getDate() + 1);
        }
        res = <div className="d-flex flex-row">{res}</div>;
    }
    
    return (
        <>
            <ModeDisplay mode={mode} setMode={setMode} />
            <div>{res}</div>
        </>
    );
}
