import React, {
	createContext,
	useContext,
	useReducer,
} from 'react';

// Creating context for storing global data
export const StateContext = createContext();
// export const StateContext = createContext(rootReducer);

// Defining a method for getting context
// It returns state and dispatch

export const useStateValue = () => useContext(StateContext);

// Defining a method for StateContext.Provider

const StateProvider = ({
	reducer,
	initialState,
	children,
}) => {
	return (
		<StateContext.Provider
			value={useReducer(reducer, initialState)}
		>
			{children}
		</StateContext.Provider>
	);
};

export default StateProvider;
