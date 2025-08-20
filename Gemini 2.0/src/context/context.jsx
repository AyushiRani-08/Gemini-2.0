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

    const delayPara =(index,nextWord) => {
        setTimeout(function () {
            setresultData(prev=>prev+nextWord);
        },75*index)
    }

    const newChat = () => {
        setloading(false);
        setshowResult(false);
    }
    
    const onSent= async(prompt) =>{
        setresultData("")
        setloading(true);
        setshowResult(true);
        let response;
        if(prompt !== undefined){
            response=await main(prompt);
            setRecentPrompt(prompt);
        }else{
            setPrevPrompts(prev =>[...prev,Input]);
            setRecentPrompt(Input);
            response=await main(Input);
        }
        let responseArray=response.split("**");
        let newResponse="";
        for(let i=0; i< responseArray.length;i++){
            if( i===0 || i%2 === 0 ){
                newResponse+=responseArray[i];
            }
            else{
                newResponse+="<b>"+ responseArray[i] + "</b>"
            }
        }
        let newResponse2=newResponse.split("*").join("<br/>")
        let newResponseArray=newResponse2.split(" ");
        for(let i=0;i<newResponseArray.length;i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
        setloading(false);
        setInput("");

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
        setInput,
        newChat

    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}

        </Context.Provider>

    )

}
export default ContextProvider