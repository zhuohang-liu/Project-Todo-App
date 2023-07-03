
export default function Entry({ entry, show_date, show_time }) {
    let entry_date = entry.date;
    let entry_time = entry.time;
    let entry_title = entry.title;

    if(entry_date === "-1" || !show_date) entry_date = "";
    if(entry_time === "-1" || !show_time) entry_time = "";

    return (
        <div>
            <div className="entry entry-date">{entry_date}</div>
            <div className="entry entry-time">{entry_time}</div>
            <div className="entry entry-title">{entry_title}</div>
        </div>
    );
}