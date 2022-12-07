const initialState = [];

export default function handleToDo(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.payload];
        case 'REMOVE_TODO':
            return state.filter((todo) => todo.id !== action.payload);
        case 'EDIT_TODO':
            return state.map((todo) => {
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
            });
        case 'MARK_TODO_DONE':
            return state.map((todo) => {
                todo.id === action.payload
                    ? [todo.status.done = !todo.status.done]
                    : todo.status.done
                return todo
            });
        case 'MARK_TODO_IN_PROGRESS':
            return state.map((todo) => {
                todo.id === action.payload
                    ? todo.status.open = !todo.status.open
                    : todo.status.open
                return todo
            });
        case 'SHOW_ALL':
            return state;
        case 'FILTER_DONE':
            let filteredArr = state.filter((todo) => todo.status.done);
            return filteredArr;
        default:
            return state;
    }
}