import { useContext } from 'react';
import { useCollapse } from 'react-collapsed';
import TodoContext from './context';


function Edit({entry_title, entry_date, entry_time}) {
    const entryobj = {date: entry_date, time: entry_time, title: entry_title};

    const { onEditClick } = useContext(TodoContext);

    return (
        <button onClick={() => onEditClick(entryobj)}>Edit</button>
    );
}

function Delete({entryid, date}) {
    const { removeTodos } = useContext(TodoContext);

    return (
        <button onClick={() => removeTodos(entryid, date)}>Delete</button>
    );
}

export default function Entry({ entry, show_date, show_time }) {
    
    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    let entry_date = entry.date;
    let entry_time = entry.time;
    let entry_title = entry.title;

    let entry_key = entry_date + "T" + entry_time + "_" + entry_title;
    let _date = entry_date;

    if(entry_date === "-1" || !show_date) entry_date = "";
    if(entry_time === "-1" || !show_time) entry_time = "";

    return (
        <div className="collapsible">
            <div className="header_entry" {...getToggleProps()}>
                <div className="entry entry-title">{entry_title}</div>
                <div className="entry entry-date">{entry_date}</div>
                <div className="entry entry-time">{entry_time}</div>
            </div>
            <div {...getCollapseProps()}>
                <div>
                    <Delete entryid={entry_key} date={_date}/>
                </div>
                <div>
                    <Edit entry_title={entry_title} entry_date={entry_date} entry_time={entry_time}/>
                </div>
            </div>
        </div>
    );
}