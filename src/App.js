import { useEffect, useState } from "react";
import { Table } from "./Table/Table";
import "./App.css";

function App() {
  const [hotReposData, setHotReposData] = useState([
    {
      id: "",
      name: "",
      description: "",
      stars: "",
    },
  ]);
  const [prolificUsersData, setProlificUserData] = useState([
    {
      id: "",
      login: "",
      avatarImage: "",
      followers: "",
    },
  ]);
  const [errRepo, setErrRepo] = useState(null);
  const [errUser, setErrUser] = useState(null);

  const fetchRepoData = () => {
    fetch(
      "https://api.github.com/search/repositories?q=created:2020-11-01..2020-12-01&sort=stars&order=desc&per_page=5"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrRepo(`There was an error with your request: ${data.message}`);
        } else {
          setErrRepo(null);
          const parsedData = data.items.map(
            ({ id, name, description, stargazers_count }) => {
              return {
                id: id,
                name: name,
                description: description,
                stars: stargazers_count,
              };
            }
          );
          setHotReposData(parsedData);
        }
      })
      .catch((err) => {
        setHotReposData([
          {
            id: "",
            name: "",
            description: "",
            stars: "",
          },
        ]);
        setErrRepo(`There was an error with your request: ${err}`);
      });
  };

  const fetchUserData = () => {
    fetch(
      "https://api.github.com/search/users?q=created:%3E2019-12-07&sort=followers&order=desc&per_page=5"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrUser(`There was an error with your request: ${data.message}`);
        } else {
          setErrUser(null);
          const parsedData = data.items.map(
            ({ id, login, avatar_url, followers_url }) => {
              return {
                id: id,
                login: login,
                avatarImage: avatar_url,
                followers: followers_url,
              };
            }
          );
          setProlificUserData(parsedData);
        }
      })
      .catch((err) => {
        setProlificUserData([
          {
            id: "",
            login: "",
            avatarImage: "",
            followers: "",
          },
        ]);
        setErrUser(`There was an error with your request: ${err}`);
      });
  };

  useEffect(() => {
    fetchRepoData();
    fetchUserData();
    const interval = setInterval(() => {
      fetchUserData();
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <section className="AppSection">
        <h1 className="AppTitle">Hot Repos</h1>
        <button
          className="AppButton"
          type="button"
          id="hot_repo"
          onClick={() => fetchRepoData()}
        >
          Refresh Repos
        </button>
        {errRepo ? <p>{errRepo}</p> : <Table data={hotReposData} />}
      </section>
      <section className="AppSection">
        <h1 className="AppTitle">Prolific Users</h1>
        <button
          className="AppButton"
          type="button"
          id="prolific_users"
          onClick={() => fetchUserData()}
        >
          Refresh Users
        </button>
        {errUser ? <p>{errUser}</p> : <Table data={prolificUsersData} />}
      </section>
    </div>
  );
}

export default App;
