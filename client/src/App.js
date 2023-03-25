import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [responseData, setresponseData] = useState("");
  const [upadteData, setupadteData] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      console.log(response);
      setresponseData(response.data);
    });
  }, []);
  const submitReview = () => {
    // alert("data is here", movieName, review);
    console.log("data", movieName, review);
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      setresponseData([
        ...responseData,
        { movieName: movieName, movieReview: review },
      ]);
    });
  };

  const deleteReview = (name) => {
    console.log("movie name", name);
    Axios.delete(`http://localhost:3001/api/delete/${name}`).then(() => {});
  };

  const updateReview = (name) => {
    console.log("movie name", upadteData);
    Axios.put("http://localhost:3001/api/update", {
      name: name,
      upadteData: upadteData,
    }).then(() => {});
  };
  const [selectedValue, setSelectedValue] = useState("option1");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="App">
      <h1> CRUD OPERATIONS </h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movie name"
          onChange={(e) => setMovieName(e.target.value)}
        />
        <label>Review</label>
        <input
          type="text"
          name="review"
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={submitReview}> Submit</button>
        {responseData &&
          responseData.map((val) => {
            return (
              <div className="card">
                <h1>Movie Name: {val.movieName} </h1>
                <p> Movie Review: {val.movieReview}</p>

                <button
                  onClick={() => {
                    deleteReview(val.movieName);
                  }}
                >
                  Delete
                </button>
                <input
                  type="text"
                  id="updateInput"
                  onChange={(e) => setupadteData(e.target.value)}
                />
                <button
                  onClick={() => {
                    updateReview(val.movieName);
                  }}
                >
                  Update
                </button>

                <select
                  id="my-dropdown"
                  value={selectedValue}
                  onChange={handleChange}
                >
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
