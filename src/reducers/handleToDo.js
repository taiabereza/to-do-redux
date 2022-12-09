const initialState = {
    todos: [],
    filteredTodos: [],
    activeFilter: 'ALL',
    activeDateFilter: 'OLD_TO_NEW_CREATION'
}

export default function handleToDo(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodosAdded = [...state.todos, action.payload];
            return {
                ...state,
                todos: newTodosAdded,
                filteredTodos: state.activeFilter === 'DONE' ?
                    newTodosAdded.filter(todo => todo.status.done)
                    : state.activeFilter === 'IN_PROGRESS' ?
                        newTodosAdded.filter(todo => !todo.status.open && !todo.status.done)
                        : state.activeFilter === 'OPEN' ?
                            newTodosAdded.filter(todo => todo.status.open && !todo.status.done)
                            : newTodosAdded
            }
        case 'REMOVE_TODO':
            const newTodosRemoved = state.todos.filter((todo) => todo.id !== action.payload);
            return {
                ...state,
                todos: newTodosRemoved,
                filteredTodos: state.activeFilter === 'DONE' ?
                    newTodosRemoved.filter(todo => todo.status.done)
                    : state.activeFilter === 'IN_PROGRESS' ?
                        newTodosRemoved.filter(todo => !todo.status.open && !todo.status.done)
                        : state.activeFilter === 'OPEN' ?
                            newTodosRemoved.filter(todo => todo.status.open && !todo.status.done)
                            : newTodosRemoved
            }
        case 'EDIT_TODO':
            return {
                ...state,
                todos: state.todos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        let updatedTodo = {
                            ...todo,
                            tasktitle: action.payload.tasktitle,
                            taskdescr: action.payload.taskdescr,
                            updateDate: action.payload.updateDate,
                        }
                        return updatedTodo
                    } else {
                        return todo
                    }
                }),
                filteredTodos: state.filteredTodos.map((todo) => {
                    if (todo.id === action.payload.id) {
                        let updatedTodo = {
                            ...todo,
                            tasktitle: action.payload.tasktitle,
                            taskdescr: action.payload.taskdescr,
                            updateDate: action.payload.updateDate,
                        }
                        return updatedTodo
                    } else {
                        return todo
                    }
                })
            };
        case 'MARK_TODO_DONE':
            let newTodosDone = state.todos.map((todo) => {
                todo.id === action.payload
                    ? todo.status.done = !todo.status.done
                    : todo.status.done
                return todo
            });

            return {
                ...state,
                todos: newTodosDone,
                filteredTodos: state.activeFilter === 'DONE' ?
                    newTodosDone.filter(todo => todo.status.done)
                    : state.activeFilter === 'IN_PROGRESS' ?
                        newTodosDone.filter(todo => !todo.status.open && !todo.status.done)
                        : state.activeFilter === 'OPEN' ?
                            newTodosDone.filter(todo => todo.status.open && !todo.status.done)
                            : newTodosDone
            }
        case 'MARK_TODO_IN_PROGRESS':
            let newTodosInProgress = state.todos.map((todo) => {
                todo.id === action.payload
                    ? todo.status.open = !todo.status.open
                    : todo.status.open
                return todo
            });

            return {
                ...state,
                todos: newTodosInProgress,
                filteredTodos: state.activeFilter === 'DONE' ?
                    newTodosInProgress.filter(todo => todo.status.done)
                    : state.activeFilter === 'IN_PROGRESS' ?
                        newTodosInProgress.filter(todo => !todo.status.open && !todo.status.done)
                        : state.activeFilter === 'OPEN' ?
                            newTodosInProgress.filter(todo => todo.status.open && !todo.status.done)
                            : newTodosInProgress
            }
        case 'ACTIVE_FILTER_CHANGED':
            return {
                ...state,
                filteredTodos: action.payload === 'DONE' ?
                    state.todos.filter(todo => todo.status.done)
                    : action.payload === 'IN_PROGRESS' ?
                        state.todos.filter(todo => !todo.status.open && !todo.status.done)
                        : action.payload === 'OPEN' ?
                            state.todos.filter(todo => todo.status.open && !todo.status.done)
                            : state.todos,
                activeFilter: action.payload
            }
        default:
            return state;
    }
}