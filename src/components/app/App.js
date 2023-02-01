import './App.css';

import { Component } from 'react';

import AppHeader from '../appHeader/AppHeader';
import ItemAddForm from '../ItemAddForm/ItemAddForm';
import ItemStatusFilter from '../ItemStatusFilter/ItemStatusFilter';
import SearchPanel from '../searchPanel/SearchPanel';
import ToDoList from '../todoList/ToDoList';

export default class App extends Component {
  max = 100; //последовательный id

  state = {
    todoDate: [
      this.createTodoitem("drink coffee"),
      this.createTodoitem("drink tea"),
      this.createTodoitem("drink Coca"),
    ],
    term: "",
    filter: "all",
  }; //state без constructor()
  // ========================================================упрощенная функция дублирования обекта
  createTodoitem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.max++,
    };
  }
  // ========================================================Удаления задачи
  deleteTask = (id) => {
    this.setState(({ todoDate }) => {
      const index = todoDate.findIndex((item) => item.id === id); // находим  id / сравниваем с параметром полученым из события
      const newArr = [
        ...todoDate.slice(0, index),
        ...todoDate.slice(index + 1),
      ]; //инструкция создания нового массива которая елеганто обходит старый
      return { todoDate: newArr }; // обект стейта будет заменен новым масивом
    });
  };
  // ========================================================добавления задачи
  addTaskTodo = (text) => {
    this.setState(({ todoDate }) => {
      const addItem = this.createTodoitem(text); //функция Дедубляжа
      const newArr = [
        //в старый массив добавляется новый
        ...todoDate,
        addItem,
      ];
      return { todoDate: newArr }; // обект стейта будет заменен новым масивом
    });
  };
  // ==========================================Работа из визуальным маркированием действий пользователя
  onToggleImportant = (id) => {
    this.setState(({ todoDate }) => {
      return { todoDate: this.propertyToggle(todoDate, id, "important") };
    });
  };
  onToggleDone = (id) => {
    this.setState(({ todoDate }) => {
      return { todoDate: this.propertyToggle(todoDate, id, "done") };
    });
  };
  propertyToggle = (arr, id, propName) => {
    const index = arr.findIndex((item) => item.id === id);
    //1.создаем новый масив в котором есть меняющеся свойство important
    const oldArr = arr[index]; //берем нужный массив
    const newItem = { ...oldArr, [propName]: !oldArr[propName] }; //в массиве проделываем операцию благодаря спреду
    //2.Конструируем  новый масив

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };
  // ==========================================Фильтр значений событий кнопки
  filter = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter((item) => !item.done);
      case "done":
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  // ==========================================================Поиск задачи
  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    //если поиска нет то по дефолту все остается на местах
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    }); //фильтр массива
  };

  onSearchChange = (term) => {
    this.setState({ term });
  };

  render() {
    const { todoDate, term, filter } = this.state;
    const todoDone = todoDate.filter((item) => item.done).length;
    const todoCount = todoDate.length - todoDone;
    const visibleItems = this.filter(this.search(todoDate, term), filter);
    return (
      <div className="todo-app">
        <AppHeader todoCount={todoCount} todoDone={todoDone} />
        <div className="normalize">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <ToDoList
          todos={visibleItems}
          onDeleteTask={this.deleteTask}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onAddTaskTodo={this.addTaskTodo} />
      </div>
    );
  }
}
