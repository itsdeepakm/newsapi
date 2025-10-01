import React from 'react'
import { useState,useEffect } from 'react'

export default function NewsApi() {
    const [data,setdata]=useState([]);
    const [search,setsearch]=useState("");
    const [watchlist,setwatchlist]=useState(JSON.parse(localStorage.getItem("watchlist"))||[]);
    useEffect(()=>{
        if(!search) return;
        let ismounted=true;
        const fetchdata=async()=>{
            const response=await fetch(`https://gnews.io/api/v4/search?q=${search}&lang=en&country=us&max=10&apikey=79b53a94d56a7e35af62617096d1c635`)
            const result=await response.json();
            if(ismounted){
                setdata(result.articles);
                console.log(result.articles);
            }
        }
        fetchdata();
        return ()=>{
            ismounted=false;
        }
    },[search]);
    const handlechange=(e)=>{
        setsearch(e.target.value);
    }
    function addtowatchlist(article){
        const newwatchlist=[...watchlist,article];
        setwatchlist(newwatchlist);
        localStorage.setItem("watchlist",JSON.stringify(newwatchlist));
    }
    return <>
     <div>
        <h1>News API</h1>
        <input type="text" placeholder='Search News' onChange={handlechange} style={{width:"300px",height:"30px",fontSize:"20px",marginBottom:"20px"}}/>
        {data&&data.map((item,index)=>{
            return <div key={index} style={{border:"1px solid black",margin:"10px",padding:"10px"}}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button onClick={()=>addtowatchlist(item)}>Add to Watchlist</button>
                </div>
        })}
     </div>
    
    </>
}