import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ViewMeds() {
    const user = useSelector(store=>store.auth.user);
    var {medicineId} = useParams()
    var [medicine,setMedicine] = useState({name:'',company:'', expiry_date:''})
    useEffect(()=>{
        console.log(medicineId)
        axios.get('https://medicalstore.mashupstack.com/api/medicine/'+ medicineId, {
            headers: {"Authorization": "Bearer " + user.token}
          }).then(response=>{
            console.log(response.data)
            setMedicine(response.data)
            console.log(setMedicine)
        })
    },[medicineId]);

    return <div>
        <Navbar/>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header"><h2>{medicine.name}</h2></div>
                        <div className="card-body">
                            <h6>{medicine.company}</h6>
                            <h4>{medicine.expiry_date}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default checkAuth(ViewMeds);