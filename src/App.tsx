import { useState, useEffect } from 'react';
import ReservoirForm from './components/ReservoirForm';
import type { ReservoirFormData } from './types/reservoir'; 


const App = () => {
  const [reservoirs, setReservoirs] = useState<ReservoirFormData[]>([]);
  const [selectedReservoir, setSelectedReservoir] = useState<ReservoirFormData | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

 
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

  return (
    <div>
      <h1>Список резервуаров</h1>
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

      <ul>
        {reservoirs.map(r => (
          <li key={r.id}>
            {r.name} (ёмкость: {r.capacity}) {r.isBlocked ? '[Заблокирован]' : ''}
            <button onClick={() => { setSelectedReservoir(r); setIsFormVisible(true); }}>Редактировать</button>
            <button onClick={() => handleDelete(r.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
