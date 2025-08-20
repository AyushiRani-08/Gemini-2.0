import {createContext, useState} from "react";
import Main from "../components/mainsec/Main";
import main from "../config/gemini";

export const Context=createContext();

const ContextProvider = (props) =>{

    const[Input,setInput]=useState("");
    const[recentPrompt,setRecentPrompt]=useState();
    const[PrevPrompts,setPrevPrompts]=useState([]);
    const [showResult,setshowResult]=useState(false);
    const[loading,setloading]=useState(false);
    const[resultData,setresultData]=useState(" ");
    
    const onSent= async(prompt) =>{
        await main(prompt)
    }

    const contextValue={
        PrevPrompts,
        setPrevPrompts,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        setshowResult,
        loading,
        setloading,
        resultData,
        setresultData,
        Input,
        setInput

    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}

        </Context.Provider>

    )

}
export default ContextProvider