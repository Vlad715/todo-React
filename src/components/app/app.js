import React, { Component } from 'react';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo.list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

import './app.css';

export default class App extends Component  {

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: "all", // all, active, done
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id );

            const newArray = [
                ... todoData.slice(0, idx), 
                ... todoData.slice(idx + 1)
            ];

            return {
                todoData: newArray
            };
        });
    };

    createTodoItem(label) {

        function generateId() {
            let id = '';
            let sumbol = '0123456789qwertyuiopasdfghjklzxcvbnm';
    
            for ( let i = 0; i < 5; i++) {
    
                const position = Math.round(Math.random() * sumbol.length);
                
                id += sumbol[position];
            }
            return id;
        }

        return {
            label,
            important: false,
            done: false,
            id: generateId()
             
        }
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({ todoData }) => {
    
            const newArrayAdded = [ ...todoData, newItem ];
    
            return {
                todoData: newArrayAdded
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id );

        // update object
        const oldItem = arr[idx];
        const newItem = {...oldItem, [propName]: !oldItem[propName]};

        // construct new array
        return  [
            ... arr.slice(0, idx),
            newItem, 
            ... arr.slice(idx + 1)
        ];
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    search(items, term) {

        if (term.length === 0) {
            return items;
        }

        return items.filter((item) => {
            return item.label.toLowerCase()
                    .indexOf(term.toLowerCase()) > -1;
        });
    }

    filter(items, filter) {

        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((el) => !el.done);
            case 'done':
                    return items.filter((el) => el.done);
            default: 
                return items;          
        }
    }

    render() {

        const { todoData, term, filter } = this.state;

        const visibleItems = this.filter(this.search(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel
                    onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter 
                    filter={filter}
                    onFilterChange={this.onFilterChange}/>
                </div>
                
                <TodoList todos={visibleItems}
                onDeleted={ this.deleteItem } 
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
                />
                <ItemAddForm onItemAdded={this.addItem}/>
            </div>
        );
    }  
};
