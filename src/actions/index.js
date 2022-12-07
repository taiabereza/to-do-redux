export const addTodo = (payload) => {
    return {
        type: 'ADD_TODO',
        payload
    }
}

export const removeTodo = (payload) => {
    return {
        type: 'REMOVE_TODO',
        payload
    }
}

export const editTodo = (payload) => {
    return {
        type: 'EDIT_TODO',
        payload
    }
}

export const markTodoDone = (payload) => {
    return {
        type: 'MARK_TODO_DONE',
        payload
    }
}

export const markTodoInProgress = (payload) => {
    return {
        type: 'MARK_TODO_IN_PROGRESS',
        payload
    }
}

export const showAll = () => {
    return {
        type: 'SHOW_ALL'
    }
}

export const filterDone = () => {
    return {
        type: 'FILTER_DONE'
    }
}