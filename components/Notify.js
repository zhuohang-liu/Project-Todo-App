import React, { useState, useContext } from 'react';

import TodoContext from './context';
import { getDate } from './Utility';
import Entry from './Entry';

function Notify_Box({ entry, removeNotification }) {
    return (
        <div>
            <p>{entry.time == "-1" ? "Event is today!" : "Less than 30 minutes until event start!"}</p>
            <Entry entry={entry} show_date={true} show_time={true}/>
            <button onClick={() => removeNotification(entry)}>Got it</button>
        </div>
    );
}

export default function Notify() {
    const { todos, newEvent, setEvent } = useContext(TodoContext);
    const [ time, setTime ] = useState(new Date());

    const [ bar, setBar ] = useState(new Date("1970-01-01T00:00"));
    const [ res, setRes ] = useState([]);

    const removeNotification = (entry) => {
        todos.get(entry.date).get(entry.key).notified = true;
        for(let i = 0; i < res.length; i++) {
            if(res[i].key == "notify_id_" + entry.key) {
                res.splice(i, 1);
                setTime(new Date());
                return;
            }
        }
        setTime(new Date());
    }

    var curr_date = new Date();
    curr_date.setTime(curr_date.getTime() + curr_date.getTimezoneOffset());

    [...todos.keys()].sort().forEach(date => {
        if(date == "-1") return;
        var d = new Date(date + "T00:00");
        d.setDate(d.getDate + 1);
        if(d < bar) return;

        [...todos.get(date).keys()].sort().forEach(key => {
            var time_str = date;
            var entry = todos.get(date).get(key);
            if(entry.time == "-1") time_str += "T00:00";
            else time_str += ("T" + entry.time);

            var temp = new Date(time_str);
            if(temp - bar <= 1800000) return;
            else if(temp - curr_date <= 1800000 && !entry.notified) {
                res.push((
                    <Notify_Box entry={entry} removeNotification={removeNotification} key={"notify_id_" + key} />
                ));
            }
        });
    });

    if(JSON.stringify(newEvent) != "{}") {
        var time_str = newEvent.date;
        if(newEvent.time == "-1") time_str += "T00:00";
        else time_str += ("T" + newEvent.time);

        var temp = new Date(time_str);
        if(temp - curr_date <= 1800000 && !newEvent.notified) {
            res.push((
                <Notify_Box entry={newEvent} removeNotification={removeNotification} key={"notify_id_" + newEvent.key} />
            ));
        }

        setEvent({});
    }
    
    bar.setTime(new Date());
    // }

    setInterval(() => {
        setTime(new Date());
        bar.setTime(new Date());
    }, 30000);
    
    return res;
}
