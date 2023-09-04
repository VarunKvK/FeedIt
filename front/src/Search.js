import React, { createContext, useReducer, useContext } from "react";

const SearchStateContext=createContext();

const initialState={
    inputValue:""
}

const globalReducer=(state,action)=>{
    switch (action.type){
        case 'SET_INPUT_VALUE':
            return {...state,inputValue:action.payload}
        default:
            return state;
    }
}

export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(globalReducer,initialState)

    const setInputValue=(value)=>{
        dispatch({type:'SET_INPUT_VALUE',payload:value})
    }

    return(
        <SearchStateContext.Provider value={{inputValue:state.inputValue,setInputValue}}>  
        {children}
        </SearchStateContext.Provider>
    )
}

export const useGlobalState = () => {
  const context = useContext(SearchStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalProvider');
  }
  return context;
};