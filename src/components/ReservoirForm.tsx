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
  const [errors, setErrors] = useState({
    name: '',
    capacity: ''
  });

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
    
    setErrors({ name: '', capacity: '' });
  }, [initialData]);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', capacity: '' };

    if (name.length > 25) {
      newErrors.name = 'Название не должно превышать 25 символов';
      valid = false;
    }

    if (!name.trim()) {
      newErrors.name = 'Название обязательно для заполнения';
      valid = false;
    }

    const capacityValue = Number(capacity);
    if (isNaN(capacityValue)) {
      newErrors.capacity = 'Введите корректное число';
      valid = false;
    } else if (capacityValue <= 0) {
      newErrors.capacity = 'Емкость должна быть больше 0';
      valid = false;
    } else if (capacityValue > 5000) {
      newErrors.capacity = 'Максимальная емкость не должна превышать 5000';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        id: initialData?.id,
        name,
        capacity: Number(capacity),
        isBlocked,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:</label>
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          maxLength={25}
          required 
        />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>
      <div>
        <label>Вместимость:</label>
        <input
          type="number"
          value={capacity}
          onChange={e => setCapacity(e.target.value)}
          required
        />
        {errors.capacity && <div style={{ color: 'red' }}>{errors.capacity}</div>}
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