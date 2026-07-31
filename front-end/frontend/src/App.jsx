import { useEffect, useState } from 'react';

function App() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/services')
      .then(res => res.json())
      .then(setServices);
  }, []);

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>DevMonitor</h1>
      <table>
        <thead>
          <tr><th>Serviço</th><th>Status</th><th>Tempo (ms)</th><th>Última checagem</th></tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td style={{ color: s.is_up ? 'green' : 'red' }}>
                {s.is_up ? '● UP' : '● DOWN'}
              </td>
              <td>{s.response_time_ms}</td>
              <td>{s.checked_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;