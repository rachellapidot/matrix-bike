import 'date-fns';
import React, { useEffect, useState } from "react";
import moment from "moment"
import DatePicker from "../datePicker"
import Loader from "./../loader"
import { getBykes } from "../../rest_api/api"
import "./home.css"
import { TextField } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState();
    const [index, setIndex] = useState(1)
    const [occuredBefore, setOccuredBefore] = useState(null);
    const [occuredAfter, setOccuredAfter] = useState(null);
    const [title, setTitle] = useState()
    const [search, setSearch] = useState(true)
    const [error, setError] = useState(false)
    let history = useHistory();

    useEffect(()=>{
       
        if(search){
            setLoading(true)
            const params = {
                page: index,
                per_page: 10,
            }
            if(occuredAfter) params.occurred_after = occuredAfter;
            if(occuredBefore) params.occurred_befor = occuredBefore;
            if(title) params.query = title ; 
            getBykes(params).then((res)=>{
                console.log(res)
                setData(res?.data?.incidents)
            }).catch(e=>{
                console.log("Error: ", e)
                setError(true)
            }).finally(()=>{
                setLoading(false)
                setSearch(false)
            })
        }
        
    },[index, search, occuredBefore, occuredAfter, title])

    const incIndex = () => {
        setIndex(index+1);
        setSearch(true)
    }

    const decIndex = () => {
        if(index>1){
            setIndex(index-1)
            setSearch(true)
        }
    }


    const renderList = () => {
        return data.map((item, i)=><div onClick={()=>{history.push(`/bikes/${item.id}`)}} className="item" key={i}>
                <img className={item?.media?.image_url_thumb? "img-item" : "byke-placeholder"} alt="no-img" src={item?.media?.image_url_thumb || require("../../images/byke.png")}/>
                <div className="item-details">
                    <span className="title">{item.title}</span>
                    <span className="description">{item.description}</span>
                </div>
                <div className="theft-details">
                    <div className="date"><img className="date-icon" src={require("../../images/calendar.png")} />(Accorded) {moment.unix(item.occurred_at).format("DD-MM-YYYY")}</div>
                    <div className="date"><img className="date-icon" src={require("../../images/calendar.png")} />(Updated) {moment.unix(item.updated_at).format("DD-MM-YYYY")}</div>
                    <span className="description"><img className="location" src={require("../../images/location.png")} alt="location"/>{item.address}</span> 
                </div>
        </div>)
    }

    return  <div>
        <div className="list-wrapper">
            <div className="table-header">
                <div className="filter">                    
                    <DatePicker date={occuredAfter} setDate={setOccuredAfter} label="Occurred after" />
                    <DatePicker date={occuredBefore} setDate={setOccuredBefore} label="Occurred before" />
                    <TextField value={title} onChange={(e)=> setTitle(e.target.value)} label="Search by title..."  />
                    <img onClick={()=>setSearch(true)} className="search" alt="search" src={require("../../images/search.png")} />
                </div>
                <div className="paging">
                    <img onClick={decIndex} className="arrow" alt="dec" src={require("../../images/left-arrow.png")} />
                    page {index} out of ....
                    <img onClick={incIndex} className="arrow" alt="inc" src={require("../../images/next.png")} />
                </div> 
            </div>           
            { loading? <Loader /> : 
                data?.length === 0 ? <div className="no-items">No items in list please search again or refresh page...</div> : 
                error ? <div className="error">Ooops! Some error! please retry...</div> : 
                renderList()
            }
        </div>
    </div>
}

export default Home;