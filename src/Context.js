// context creation
// provider
// consumer
// useContext hook
import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

let API = "http://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading: true,
    query:"CSS",
    nbPages: 0,
    page: 0,
    hits:[]
}

// context creation
const AppContext = React.createContext();

// creat app provider function
const AppProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchApiData = async(url) =>{

        dispatch({ type: "SET_LOADING" });
        
        try{

            const res = await fetch(url)
            const data = await res.json();
            console.log(data)

            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
            })

        }catch(error){
            console.log(error);
        }
    }

    // to remove the post
    const removePost = (post_ID) =>{
        dispatch({
            type: "REMOVE_POST",
            payload: post_ID,
        })
    }


    // search the post
    const searchPost = (searchQuery) =>{
        dispatch({
            type: "SEARCH_QUERY",
            payload: searchQuery,
        })
    }

    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`)
    }, [state.query, state.page])

    return(
        
        <AppContext.Provider value={{ ...state, removePost,  searchPost}}>
            {children}
        </AppContext.Provider>
    );

}

// custom global context

const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext, AppProvider, useGlobalContext}