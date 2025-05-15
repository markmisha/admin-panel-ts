import React, { useState, useEffect } from 'react';
import type { ReservoirFormData } from '../types/reservoir'; 

type ReservoirFormProps = {
  initialData: ReservoirFormData | null;
  onSubmit: (data: ReservoirFormData) => void;
  onCancel: () => void;
};

const ReservoirForm: React.FC<ReservoirFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCapacity(String(initialData.capacity));
      setIsBlocked(initialData.isBlocked || false);
    } else {
      setName('');
      setCapacity('');
      setIsBlocked(false);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initialData?.id,
      name,
      capacity: Number(capacity),
      isBlocked,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:</label>
        <input value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label>Вместимость:</label>
        <input
          type="number"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          required
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isBlocked}
            onChange={e => setIsBlocked(e.target.checked)}
          />
          Заблокирован
        </label>
      </div>
      <button type="submit">Сохранить</button>
      <button type="button" onClick={onCancel}>Отмена</button>
    </form>
  );
};

export default ReservoirForm;
