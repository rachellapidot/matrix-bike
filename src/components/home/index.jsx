import React, { useEffect, useState } from "react";
import moment from "moment"
import Loader from "./../loader"
import { getBykes } from "../../rest_api/api"
import "./home.css"
const Home = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState();

    useEffect(()=>{
        getBykes({
            page: 1,
            per_page: 10,
        }).then((res)=>{
            setData(res?.data?.incidents)
            setLoading(false)
        }).catch(e=>console.log("Error: ", e))
    },[])


    const renderList = () => {
        return data.map((item, i)=><div className="item" key={i}>
                <img className={item?.media?.image_url_thumb? "img-item" : "byke-placeholder"} alt="no-img" src={item?.media?.image_url_thumb || require("../../images/byke.png")}/>
                <div className="item-details">
                    <span className="title">{item.title}</span>
                    <span className="description">{item.description}</span>
                </div>
                <div className="theft-details">
                    <div className="date"><img className="date-icon" src={require("../../images/accored.png")} />(Accorded) {moment.unix(item.occurred_at).format("DD-MM-YYYY")}</div>
                    <div className="date"><img className="date-icon" src={require("../../images/update.png")} />(Updated) {moment.unix(item.updated_at).format("DD-MM-YYYY")}</div>
                    <span className="description"><img className="location" src={require("../../images/location.png")} alt="location"/>{item.address}</span> 
                </div>
        </div>)
    }

    return loading? <Loader /> : 
    <div>
        <div className="wrapper">
            {/* <tr>
                <th></th>
                <th>Byke Details</th>
                <th>Theft Details</th>
            </tr> */}
            
            {renderList()}
            
        </div>
    </div>
}

export default Home;