import { useEffect, useState } from 'react';
import '../../css/carModal.css'
import ImagePreview from './ImagePreview';
import { IBrand } from '../../interfaces/brand';


interface BrandModalProps {
  brand: IBrand | null;
  onClose: () => void;
  getAllBrand: () => void;
}

export default function BrandModal({ brand, onClose, getAllBrand }: BrandModalProps) {
  const [title, setTitle] = useState(brand?.brand || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const payload = {
      brand: title,
      ...(brand && { id: brand.id }),
    };
  
    const url = brand
      ? `${process.env.REACT_APP_DEV_URL}/updateBrand`
      : `${process.env.REACT_APP_DEV_URL}/addBrand`;
  
    const method = brand ? 'PUT' : 'POST';
  
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error response:', errorMessage);
      throw new Error('Failed to submit brand');
    }
  
    const result = await response.json();
    console.log('Brand submitted successfully:', result);
  
    getAllBrand();
    alert('Операція пройшла успішно');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{brand ? 'Edit brand' : 'Add brand'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="title">Brand:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className={brand ? 'action-btn-modal edit-btn' : 'action-btn-modal btn--red'} >
              {brand ? 'Update' : 'Add'}
            </button>
            <button type="button" className="action-btn-modal cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}