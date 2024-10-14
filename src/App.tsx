// src/App.tsx
import React, { useEffect, useState } from 'react';
import { PlayerData, PlayerDataRow } from './types'; // Import the interfaces

const App: React.FC = () => {
  const [data, setData] = useState<PlayerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://9e867b57d63f41bdb023bb340062019f.api.mockbin.io/')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json() as Promise<PlayerData>;
        })
        .then((json) => {
          setData(json);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err.message);
          setLoading(false);
        });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error: {error || 'No data available.'}</div>;
  }

  return (
      <div>
          <h1>User List</h1>
          {data.playerDataRows.map((playerDataRow: PlayerDataRow, index: number) => (
              <div key={index} style={{border: '1px solid #ccc', padding: '10px', marginBottom: '10px'}}>
                  <h2>{playerDataRow.date}</h2>
                  <p>MatchNo: {playerDataRow.matchNo}</p>
                  <p>Player: {playerDataRow.player}</p>
                  <p>Surface: {playerDataRow.surface}</p>
              </div>
          ))}
      </div>
  );
};

export default App;
