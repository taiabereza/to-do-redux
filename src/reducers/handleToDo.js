const initialState = {
	todos: [],
	filteredTodos: [],
	activeFilter: 'ALL',
	activeDateFilter: 'OLD_TO_NEW_CREATION'
}

const filterPattern = (todos, activeFilter, activeDateFilter) => {
	let filteredArr = todos;

	if (activeFilter === 'ALL') {
		switch (activeDateFilter) {
			case 'OLD_TO_NEW_CREATION':
				filteredArr = filteredArr.filter(todo => todo).sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
				break;
			case 'NEW_TO_OLD_CREATION':
				filteredArr = filteredArr.filter(todo => todo).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
				break;
			case 'OLD_TO_NEW_UPDATE':
				filteredArr = filteredArr.filter(todo => todo).sort((a, b) => new Date(a.updateDate) - new Date(b.updateDate))
				break;
			case 'NEW_TO_OLD_UPDATE':
				filteredArr = filteredArr.filter(todo => todo).sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate))
				break;
		}
	}

	if (activeFilter === 'DONE') {
		switch (activeDateFilter) {
			case 'OLD_TO_NEW_CREATION':
				filteredArr = filteredArr.filter(todo => todo.status.done).sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
				break;
			case 'NEW_TO_OLD_CREATION':
				filteredArr = filteredArr.filter(todo => todo.status.done).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
				break;
			case 'OLD_TO_NEW_UPDATE':
				filteredArr = filteredArr.filter(todo => todo.status.done).sort((a, b) => new Date(a.updateDate) - new Date(b.updateDate))
				break;
			case 'NEW_TO_OLD_UPDATE':
				filteredArr = filteredArr.filter(todo => todo.status.done).sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate))
				break;
		}
	}

	if (activeFilter === 'IN_PROGRESS') {
		switch (activeDateFilter) {
			case 'OLD_TO_NEW_CREATION':
				filteredArr = filteredArr.filter(todo => !todo.status.open && !todo.status.done).sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
				break;
			case 'NEW_TO_OLD_CREATION':
				filteredArr = filteredArr.filter(todo => !todo.status.open && !todo.status.done).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
				break;
			case 'OLD_TO_NEW_UPDATE':
				filteredArr = filteredArr.filter(todo => !todo.status.open && !todo.status.done).sort((a, b) => new Date(a.updateDate) - new Date(b.updateDate))
				break;
			case 'NEW_TO_OLD_UPDATE':
				filteredArr = filteredArr.filter(todo => !todo.status.open && !todo.status.done).sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate))
				break;
		}
	}

	if (activeFilter === 'OPEN') {
		switch (activeDateFilter) {
			case 'OLD_TO_NEW_CREATION':
				filteredArr = filteredArr.filter(todo => todo.status.open && !todo.status.done).sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate))
				break;
			case 'NEW_TO_OLD_CREATION':
				filteredArr = filteredArr.filter(todo => todo.status.open && !todo.status.done).sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))
				break;
			case 'OLD_TO_NEW_UPDATE':
				filteredArr = filteredArr.filter(todo => todo.status.open && !todo.status.done).sort((a, b) => new Date(a.updateDate) - new Date(b.updateDate))
				break;
			case 'NEW_TO_OLD_UPDATE':
				filteredArr = filteredArr.filter(todo => todo.status.open && !todo.status.done).sort((a, b) => new Date(b.updateDate) - new Date(a.updateDate))
				break;
		}
	}

	return filteredArr;
}

export default function handleToDo(state = initialState, action) {
	switch (action.type) {
		case 'ADD_TODO':
			const newTodosAdded = [...state.todos, action.payload];
			return {
				...state,
				todos: newTodosAdded,
				filteredTodos: filterPattern(newTodosAdded, state.activeFilter, state.activeDateFilter)
			}
		case 'REMOVE_TODO':
			const newTodosRemoved = state.todos.filter((todo) => todo.id !== action.payload);
			return {
				...state,
				todos: newTodosRemoved,
				filteredTodos: filterPattern(newTodosRemoved, state.activeFilter, state.activeDateFilter)
			}
		case 'EDIT_TODO':
			const newTodosEdited = state.todos.map((todo) => {
				if (todo.id === action.payload.id) {
					const updatedTodo = {
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

			return {
				...state,
				todos: newTodosEdited,
				filteredTodos: filterPattern(newTodosEdited, state.activeFilter, state.activeDateFilter)
			};
		case 'MARK_TODO_DONE':
			const newTodosDone = state.todos.map((todo) => {
				todo.id === action.payload
					? todo.status.done = !todo.status.done
					: todo.status.done
				return todo
			});

			return {
				...state,
				todos: newTodosDone,
				filteredTodos: filterPattern(newTodosDone, state.activeFilter, state.activeDateFilter)
			}
		case 'MARK_TODO_IN_PROGRESS':
			const newTodosInProgress = state.todos.map((todo) => {
				todo.id === action.payload
					? todo.status.open = !todo.status.open
					: todo.status.open
				return todo
			});

			return {
				...state,
				todos: newTodosInProgress,
				filteredTodos: filterPattern(newTodosInProgress, state.activeFilter, state.activeDateFilter)
			}
		case 'ACTIVE_FILTER_CHANGED':
			return {
				...state,
				filteredTodos: filterPattern(state.todos, action.payload, state.activeDateFilter),
				activeFilter: action.payload
			}
		case 'ACTIVE_DATE_FILTER_CHANGED':
			return {
				...state,
				filteredTodos: filterPattern(state.todos, state.activeFilter, action.payload),
				activeDateFilter: action.payload
			}
		default:
			return state;
	}
}