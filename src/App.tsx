import { useState, useEffect } from 'react';
import ReservoirForm from './components/ReservoirForm';
import type { ReservoirFormData } from './types/reservoir'; 
import "./App.css";

const App = () => {
  const [reservoirs, setReservoirs] = useState<ReservoirFormData[]>([]);
  const [selectedReservoir, setSelectedReservoir] = useState<ReservoirFormData | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setReservoirs([
        { id: 1, name: 'Резервуар 1', capacity: 1000, isBlocked: false },
        { id: 2, name: 'Резервуар 2', capacity: 2000, isBlocked: true },
      ]);
    }, 500);
  }, []);

  const handleCreate = (data: ReservoirFormData) => {
    setReservoirs(prev => [...prev, { ...data, id: Date.now() }]);
    setIsFormVisible(false);
  };

  const handleUpdate = (data: ReservoirFormData) => {
    setReservoirs(prev => prev.map(r => (r.id === data.id ? data : r)));
    setSelectedReservoir(null);
    setIsFormVisible(false);
  };

  const handleDelete = (id?: number) => {
    if (!id) return;
    setReservoirs(prev => prev.filter(r => r.id !== id));
  };

  const filteredReservoirs = reservoirs.filter(reservoir =>
    reservoir.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>Список резервуаров</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Поиск по имени резервуара"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '300px' }}
        />
      </div>

      <button onClick={() => { setSelectedReservoir(null); setIsFormVisible(true); }}>
        Добавить резервуар
      </button>

      {isFormVisible && (
        <ReservoirForm
          initialData={selectedReservoir}
          onSubmit={selectedReservoir ? handleUpdate : handleCreate}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      <ul className='buttoncontainer'>
        {filteredReservoirs.map(r => (
          <li key={r.id}>
            {r.name} (ёмкость: {r.capacity}) {r.isBlocked ? '[Заблокирован]' : ''}
            <button className='superbutton' onClick={() => { setSelectedReservoir(r); setIsFormVisible(true); }}>Редактировать</button>
            <button className='superbutton' onClick={() => handleDelete(r.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;