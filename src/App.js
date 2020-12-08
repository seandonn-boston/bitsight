import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [hotReposData, setHotReposData] = useState({});
  const [prolificUsersData, setProlificUserData] = useState({
    id: "",
    login: "",
    avatarImage: "",
    followers: "",
  });
  const [errRepo, setErrRepo] = useState(null);
  const [errUser, setErrUser] = useState(null);

  const fetchRepoData = () => {
    fetch(
      "https://api.github.com/search/repositories?q=created:2020-11-01..2020-12-01&sort=stars&order=desc&per_page=5"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrRepo(data.message);
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
        setHotReposData({});
        setErrRepo(err);
      });
  };

  const fetchUserData = () => {
    fetch(
      "https://api.github.com/search/users?q=created:%3E2019-12-07&sort=followers&order=desc&per_page=5"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setErrUser(data.message);
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
          console.log(parsedData);
          setProlificUserData(data);
        }
      })
      .catch((err) => {
        setProlificUserData({});
        setErrUser(err);
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

  return <div className="App">hello world</div>;
}

export default App;
