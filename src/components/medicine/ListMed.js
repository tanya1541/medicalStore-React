import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar";
import MedListItem from "./MedListItem";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";

function ListMeds() {
  const [allMeds, setAllMeds] = useState([]); // Store all the fetched medicines from the API
  const [filteredMeds, setFilteredMeds] = useState([]); // Store the filtered medicines based on search term
  const [SearchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  let user = useSelector(store=> store.auth.user);

  const handleSearchInputChange = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    // event.preventDefault();
    // if (SearchTerm.trim() === "") {

    //   setFilteredMeds(allMeds);
    // } else {

    //   var filteredItems = allMeds.filter((item) =>
    //     item.name.toLowerCase().includes(SearchTerm.toLowerCase())
    //   );
    //   setFilteredMeds(filteredItems);
    // }
    axios.get('https://medicalstore.mashupstack.com/api/medicine/search?keyword='+SearchTerm, {
      headers: {"Authorization": "Bearer "+ user.token} 
    }).then((response)=>{
      setFilteredMeds(response.data);
    })
  };

  function fetchMeds() {
    axios
      .get('https://medicalstore.mashupstack.com/api/medicine',{
        headers: {"Authorization": "Bearer " + user.token}
      })
      .then((response) => {
        setAllMeds(response.data);
        setFilteredMeds(response.data); // Initialize filteredMeds with all the fetched medicines
      });
  }

  useEffect(() => {
    fetchMeds();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center my-4">Medicines</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <form>
              <label>Search Medicines: </label>
              <input
                className="ml-2"
                type="text"
                value={SearchTerm}
                onChange={handleSearchInputChange}
              />{" "}
              &nbsp;
              <button
                className="btn btn-small btn-success"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
              &nbsp;
            </form>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <Link to="/medicine/create" className="btn btn-info mb-2">
              Add Medicine
            </Link>
            {filteredMeds.length === 0 ? (
              <p>No matching medicines found.</p>
            ) : (
              filteredMeds.map((medicine) => (
                <MedListItem key={medicine.id} medicine={medicine} refresh={fetchMeds} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(ListMeds);