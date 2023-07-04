import { useState, createContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import TodoContext from './components/context';
import Form from './components/Form';
import List from './components/List';

import "./node_modules/bootstrap/dist/css/bootstrap.min.css";
import './styles.css';

const { Map } = require('immutable');
export default function App() {

    /* @todos : list of entries
        * type: map 
        * key : date (string)
        * value: map (key: entry id (string); value: info of entry (obj {title, date, time})) 
    */
    const [todos, setTodos] = useState(new Map());

    // check if entry id is unique
    const checkTodos = (entryid, date) => {
        if(todos.get(date) == undefined) return true;
        return !todos.get(date).has(entryid);
    }


    const addTodos = (entryid, entryinfo) => {
        if(entryinfo.date === "") entryinfo.date = "-1";
        if(entryinfo.time === "") entryinfo.time = "-1";
        
        if(todos.get(entryinfo.date) === undefined) {
            setTodos(new Map(todos.set(entryinfo.date, new Map([[entryid, entryinfo]]))));
        } else {
            setTodos(new Map(todos.set(entryinfo.date, todos.get(entryinfo.date).set(entryid, entryinfo))));
        }
    }

    const removeTodos = (entryid, date) => {

        let datetodos = new Map(todos.get(date));
        datetodos = datetodos.delete(entryid);

        let newtodos = new Map(todos);
        newtodos = newtodos.set(date, datetodos);

        setTodos(newtodos);
    }

    return (
        <View style={styles.container}>
            <TodoContext.Provider value={{ todos, checkTodos, addTodos, removeTodos }}>
                <Form />
                <List />
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
