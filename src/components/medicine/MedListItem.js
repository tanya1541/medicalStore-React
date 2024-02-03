import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function MedListItem(props) {
    const user = useSelector(store=>store.auth.user);
    function deleteMed() {
        axios.delete('https://medicalstore.mashupstack.com/api/medicine/'+ props.medicine.id, {
            headers: {"Authorization": "Bearer "+ user.token}
        })
            .then(response => {
                alert(response.data.message)
                props.refresh()
            })
    }
    return (
        <div className="card">
            <div className="card-body">
                {props.medicine.name}
                <button className="btn btn-danger float-right ml-2" onClick={deleteMed}>Delete</button>
                <Link to={"/medicine/"+props.medicine.id+ "/edit"} className="btn btn-primary float-right ml-2">Edit</Link>
                <Link to={"/medicine/"+ props.medicine.id} className="btn btn-info float-right ml-2">View</Link>
            </div>
        </div>
    )
}
export default MedListItem;