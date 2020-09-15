import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { getById, getMap } from "../../rest_api/api";
import Loader from "../loader";
import "./bike.css"

const BikeDetais = () => {
    const [bike, setBike] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const[map, setMap]= useState(false);
    const [mapError, setMapError] = useState(false)
    const {id} = useParams();
    useEffect(()=>{
        getById(id).then((res)=> {
            setBike(res?.data?.incident)
        }).catch((e)=>{
            setError(true)
            console.log("Error: ",e);
        }).finally(()=>{
            setLoading(false)
        })
    },[id])

return loading ? <Loader /> : 
    <div>
        {
            error ? <div className="error">Error While getting bike details. Please Try again.</div> :
            <div className="details-wrapper">
                <img 
                    alt="No Map Available"
                    src={`https://www.mapquestapi.com/staticmap/v5/map?key=BmKOfZCeiOwUDjoS9xqZTKVcGVs62l3V&center=${encodeURIComponent(bike.address)}&size=${encodeURIComponent("170,170@2x")}&zoom=16`}
                />
                <div className="bike-wrapper"> 
                    <img className="bike-img" src={bike?.media?.image_url? bike.media.image_url : require("../../images/byke.png")}/>
                    <div className="bike-title">{bike.title}</div>
                    <div className="bike-desc">{bike.description}</div>
                    <div className="bike-theft-wrapper">
                        <div className="theft-detail">
                            <img className="bike-theft-img" src={require("../../images/calendar.png")} />
                            <span className="bike-theft-details">{"Accurred At: " + moment.unix(bike.occurred_at).format("DD-MM-YYYY")}</span>
                        </div>
                        <div className="theft-detail">
                            <img className="bike-theft-img" src={require("../../images/calendar.png")} />
                            <span className="bike-theft-details">{"Updated At: "+moment.unix(bike.updated_at).format("DD-MM-YYYY")}</span>
                        </div>
                        <div className="theft-detail">
                            <img className="bike-theft-img" src={require("../../images/location.png")} />
                            <span className="bike-theft-details">{bike.address}</span>
                        </div>
                    </div>
                </div>
            </div>
        }
    </div>
}
export default BikeDetais;