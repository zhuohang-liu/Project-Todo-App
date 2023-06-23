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
    // const [update, triggerUpdate] = useState(0);
    const [todos, setTodos] = useState(new Map());
    todos.set("1", "123");
    console.log("APP: " + JSON.stringify(todos));

    const checkTodos = (k, date) => {
        if(todos.get(date) == undefined) return true;
        return !todos.get(date).has(k);
    }

    const addTodos = (k, v) => {
        if(v.date === "") v.date = "-1";
        if(v.time === "") v.time = "-1";
        // if(todos.get(v.date) === undefined) setTodos(new Map(todos.set(v.date, new Map())));
        console.log(JSON.stringify(todos));
        if(todos.get(v.date) === undefined) {
            console.log("NEW DATE");
            setTodos(new Map(todos.set(v.date, new Map([[k, v]]))));
        } else {
            console.log("EXISTING DATE");
            setTodos(new Map(todos.set(v.date, todos.get(v.date).set(k, v))));
        }
    }

    const removeTodos = (k, date) => {
        setTodos(new Map(todos.get(date).delete(k)));
    }

    return (
        <View style={styles.container}>
            <TodoContext.Provider value={{ todos, checkTodos, addTodos, removeTodos }}>
                <Form addTodos={(k, v) => addTodos(k, v)} checkTodos={k => checkTodos(k)} />
                <List />
                <StatusBar style="auto" />
                <div className="d-flex flex-row"></div>
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
