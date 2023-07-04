import { useState, useContext } from 'react';
import TodoContext from './context';
import Entry from './Entry';

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
        res.push([...todos.keys()].map(k => {
            return [...todos.get(k).keys()].map(k2 => {
                return (
                    <Entry entry={todos.get(k).get(k2)} show_date={true} show_time={true} key={"list"+k} />
                );
            });
        }));
    } else if(mode === "Calendar") {
        const date = new Date();
        for(let i = 0; i < 7; i++) {
            const k0 = [
                date.getFullYear(),
                ((date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1)),
                ((date.getDate() < 10 ? "0" : "") + (date.getDate()))
            ].join("-");
            const curr = [<div key="list0">{k0}</div>];
            if(todos.get(k0) != undefined) {
                curr.push([...todos.get(k0).keys()].map(k => {
                    return (
                        <Entry entry={todos.get(k0).get(k)} show_date={false} show_time={true} key={"list"+k} />
                    );
                }));
            }

            res.push(<div className="d-flex flex-column m-3">{curr}</div>);
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
