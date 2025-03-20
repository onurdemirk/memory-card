import React from "react";
import "./fonts/njnaruto.ttf";
import "./styles.css";
import arrayShuffle from "array-shuffle";
import logo from "./img/logo.png";

export default function App() {
  const [akatsuki, setAkatsuki] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [clickedMemberList, setClickedMemberArrList] = React.useState([]);

  React.useEffect(() => {
    const fetchAkatsuki = async () => {
      try {
        const res = await fetch("https://dattebayo-api.onrender.com/akatsuki");
        if (!res.ok) {
          throw new Error("Network response is not ok");
        }
        const data = await res.json();
        setAkatsuki(data.akatsuki);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAkatsuki();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const playGame = (clickedMemberId) => {
    const shuffledArray = arrayShuffle(akatsuki);
    setAkatsuki(shuffledArray);

    if (!clickedMemberList.includes(clickedMemberId)) {
      setClickedMemberArrList((prevMember) => [...prevMember, clickedMemberId]);
      setScore((prevScore) => prevScore + 1);
    } else if (clickedMemberList.includes(clickedMemberId))  {
      score > bestScore ? setBestScore(score) : bestScore;
      setScore(0);
      setClickedMemberArrList([]);
    }
  };

  return (
    <div className="container">
      <div className="left-block">
        <div>
          <img src={logo} alt="naruto" /> <br></br>
          <br></br>
          <span>
            <h3>Memory Card Game</h3>
          </span>
        </div>
        <p>
          Get points by clicking on an image but don't click on any more than
          once!
        </p>
        <p>
          <span>{`Score: ${score}`}</span>
          <br></br>
          <br></br>
          <span>{`Bestscore: ${bestScore}`}</span>
        </p>
      </div>
      <div className="akatsuki">
        {akatsuki.map((member, index) =>
          index < 12 ? (
            <div
              className="members"
              key={member.id}
              onClick={() => playGame(member.id)}
              style={{cursor:"pointer"}}
            >
              <img src={member.images[0]} alt={member.name} />
              <p>{member.name}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
