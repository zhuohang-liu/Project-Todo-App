import { useState, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Map } from 'immutable';

import TodoContext from './components/context';
import Form from './components/Form';
import List from './components/List';
import Notify from './components/Notify';

import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import './styles.css';

export default function App() {

    /* @todos : list of entries
        * type: map 
        * key : date (string)
        * value: map (key: entry id (string); value: info of entry (obj {title, date, time})) 
    */
    const [todos, setTodos] = useState(new Map());
    
    /* @entrydisplay : entry to be displayed in the form
        * type: object 
        * fields : title (string), date (string), time (string)
    */
    const [entrydisplay, setEntrydisplay] = useState({date: "", time: "", title: ""});

    /* @fmode : mode of the form (either "add" or "edit")
        * type: string
    */
    const [fmode, setFmode] = useState("add");
    const [newEvent, setNewEvent] = useState({});

    // check if entry id is unique
    const checkTodos = (entryid, date) => {
        if(todos.get(date) == undefined) return true;
        return !todos.get(date).has(entryid);
    }


    const addTodos = (entryid, entryinfo) => {
        if(entryinfo.date === "") entryinfo.date = "-1";
        if(entryinfo.time === "") entryinfo.time = "-1";
        
        setNewEvent(entryinfo);
        if(todos.get(entryinfo.date) === undefined) {
            setTodos(new Map(todos.set(entryinfo.date, new Map([[entryid, entryinfo]]))));
        } else {
            setTodos(new Map(todos.set(entryinfo.date, todos.get(entryinfo.date).set(entryid, entryinfo))));
        }
    }

    const removeTodos = (entryid, date) => {
        setTodos(new Map(todos.get(date).delete(entryid)));
    }

    const setEvent = (e) => {
        setNewEvent(e);
    }

    return (
        <View style={styles.container}>
            <TodoContext.Provider value={{ todos, checkTodos, addTodos, removeTodos, editTodos, onEditClick, newEvent, setEvent }}>
                <Form display_entry={entrydisplay} fmode={fmode}/>
                <List />
                <Notify />
                <StatusBar style="auto" />
            </TodoContext.Provider>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
