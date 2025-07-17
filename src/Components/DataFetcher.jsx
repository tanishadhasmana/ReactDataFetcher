import React, { useEffect, useState } from 'react';

function DataFetcher() {
  const [url, setUrl] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchTrigger, setFetchTrigger] = useState(false);

  useEffect(() => {
    if (!fetchTrigger || !url.trim()) return;

    setLoading(true);
    setError(null);

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return response.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });

    setFetchTrigger(false);
  }, [fetchTrigger, url]);

  return (
    <>
   <div style={{display:'flex', alignItems:'center',justifyContent:'center', fontWeight:'700', marginTop:'55px'}}>Dynamic Data Fetcher
   </div>

    <div style={{ padding: '20px', fontFamily: 'Arial', display:'flex', alignItems:'center',justifyContent:'center'}}>
        
      <div>
      <input
        type="text"
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '400px', padding: '8px' }}
      />
      </div>

      <div>
         <button
        onClick={() => setFetchTrigger(true)}
        style={{
          marginLeft: '10px',
          padding: '8px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Fetch
      </button>
      </div>
      
      

      <div style={{ marginTop: '20px' }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {data && (
          <pre
            style={{
              backgroundColor: '#f4f4f4',
              padding: '10px',
              borderRadius: '5px',
              maxHeight: '400px',
              overflow: 'auto',
            }}
          >
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
    </>
  );
}

export default DataFetcher;
