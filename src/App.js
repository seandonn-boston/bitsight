import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [topFiveRepos, setTopFiveRepos] = useState({});
  const [topFiveUsers, setTopFiveUsers] = useState({});

  const fetchRepoData = () => {
    fetch(
      "https://api.github.com/search/repositories?q=created:2020-11-01..2020-12-01&sort=stars&order=desc&per_page=5"
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const fetchUserData = () => {
    fetch(
      "https://api.github.com/search/repositories?q=created:2020-11-01..2020-12-01&sort=stars&order=desc&per_page=5"
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // fetchRepoData();
    // fetchUserData();
    setInterval(() => {
      fetchUserData();
    }, 120000);
  }, []);

  return <div className="App">hello world</div>;
}

export default App;
