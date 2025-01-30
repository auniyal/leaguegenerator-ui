"use client"
import { useState, ChangeEvent, FormEvent } from "react";

export default function GetPlayerNames() {
    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(2);
    const [playerName, setPlayerNames] = useState<string[]>(new Array(numberOfPlayers).fill(''));
    const [submittedNames, setSubmittedNames] = useState<string[]>([]);
    const [playerDataRows, setPlayerDataRows] = useState<any[]>([]);

    const handleNumberOfPlayers = (e: ChangeEvent<HTMLInputElement>) => {
        setNumberOfPlayers(Number(e.target.value));

    };

    const handleNameChange = (index : number, e: ChangeEvent<HTMLInputElement>) => {
       const addPlayerNames = [...playerName];
       addPlayerNames[index] = e.target.value;
       setPlayerNames(addPlayerNames);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (playerName.every(name => name.trim() != '')) {
            setSubmittedNames([...submittedNames, ...playerName])
              const playerDataRow = playerName.map((name, index) => ({
                   date: "2024-11-21",
                   matchNo: playerDataRows.length+index + 1,
                   player: name,
                   surface: "Red",
                   name : playerName,
                   //number of players??
              }));

           setPlayerDataRows([...playerDataRows, playerDataRow]);
           setPlayerNames(new Array(numberOfPlayers).fill(''));
        } else {
            alert(`Player names input is required for the match`);
        }
    };


    return (
        <div>
            <h1>Tennis Match Entry Form </h1>
            <h1>Feed Match details</h1>
            <form onSubmit={handleSubmit}>
               <label>
                   Number of Players:
                     <input
                        type="number"
                        value={numberOfPlayers}
                        onChange={handleNumberOfPlayers}
                        placeholder="Number of Players"
                     />
                </label>
                {Array.from({length: numberOfPlayers}).map ((_, index) => (
                    <label key = {index}>
                      Player {index + 1} Name:
                      <input
                         type="text"
                         value={playerName[index]}
                         onChange={(e) => handleNameChange(index, e)}
                         placeholder={'Feed Player ${index + 1} Name'}
                      />
                      <br/>
                    </label>
                 ))}
                <button type="submit">Add Player</button>
            </form>


            <h2>Submitted Names</h2>
            <ul>
                {submittedNames.map((submittedName, index) => (
                    <li key={index}>{submittedName}</li>
                ))}
            </ul>

            <h2>Player Data Rows</h2>
              <pre>{JSON.stringify({ playerDataRows }, null, 2)}</pre>
        </div>
    );
}
