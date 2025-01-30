"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import { UserInput } from './UserInput'; // Import the interfaces


export default function GetPlayerNames() {
    const [currentPlayer, setCurrentPlayer] = useState<number>(0);
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<UserInput>({
            startDate: "",
            players: [],
            full: "true",
        });
    const [playerName, setPlayerName] = useState<string>('');

    const handleNumberOfPlayers = (e: ChangeEvent<HTMLInputElement>) => {
        setNumberOfPlayers(Number(e.target.value));
        setPlayerNames([]);
        setCurrentPlayer(0);

    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
       setPlayerName(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (playerName.trim()) {
            const playerNamesList = [...playerNames, playerName];
            setPlayerNames(playerNamesList);
              const userInput = {
                   startDate: new Date().toISOString(),
                   players: playerNamesList,
                   full : "true"
              };

           setUserInput(userInput)
           setPlayerName('');
           setCurrentPlayer(currentPlayer + 1);
        } else {
            alert(`Player name is mandatory for the match`);
        }
    };

const handleUserInputSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userInput.players.length > 0) {
           console.log("UserInput passed from Feed form", userInput);


        fetch('http://localhost:8080/v2/api/match/8', {
                   method: 'POST',
                   headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  },
           body: JSON.stringify(userInput)
          })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json() as Promise<UserInput>;
        })
//         .then((json) => {
//           setData(json);
//           setLoading(false);
//         })
//         .catch((err: Error) => {
//           setError(err.message);
//           setLoading(false);
//         });
    } else {
       alert("Submit players !!!")
        }
    };



    return (
        <div>
            <h1>Tennis Match Entry Form </h1>
            <h1>Feed Match details</h1>

               <label>
                   Number of Players:
                     <input
                        type="number"
                        value={numberOfPlayers}
                        onChange={handleNumberOfPlayers}
                        placeholder="Number of Players"
                     />
                </label>
                <br/>
                {currentPlayer < numberOfPlayers ? (
                   <form onSubmit={handleSubmit}>
                       <label>
                           Player {currentPlayer + 1} Name:
                          <input
                            type="text"
                            value={playerName}
                            onChange={handleNameChange}
                            placeholder={'Feed Player ${index + 1} Name'}
                         />
                    </label>
                     <button type="submit">Add Player</button>
                    </form>
                ) : (<p> All required players added for the match</p>)
                };


             <form onSubmit={handleUserInputSubmit}>
                <label>  Submit PlayerData:    </label>
                <button type="submit">Submit PlayerData</button>
            </form>

        </div>
    );
}
