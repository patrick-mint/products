import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ editingProduct, onAdd, onProductUpdated, onCancelEdit }) => {
  const [product, setProduct] = useState({
    productId: '',
    name: '',
    price: ''
  });

  useEffect(() => {
    if (editingProduct) {
      setProduct({
        productId: editingProduct.id,
        name: editingProduct.name,
        price: editingProduct.price
      });
    } else {
      setProduct({
        productId: '',
        name: '',
        price: ''
      });
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!product.name.trim() || !product.price.trim()) {
      window.alert("Please fill in the form before submit.")
    
      return; 
    }

    try {
      if (editingProduct) {
        await axios.put(`http://localhost:8080/api/v1/products/${product.productId}`, {
          name: product.name,
          price: parseFloat(product.price)
        });
        onProductUpdated({ ...editingProduct, name: product.name, price: product.price });
      } else {
        const response = await axios.post('http://localhost:8080/api/v1/products', {
          name: product.name,
          price: parseFloat(product.price)
        });
        onAdd(response.data);
      }
      setProduct({
        ...product,
        name: '',
        price: ''
      });
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  return (
    <div className="mt-4"> 
      <h2>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3"> 
          <label className="form-label">Name:</label>
          <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div className="mb-3"> 
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-primary me-2">{editingProduct ? 'Edit Product' : 'Add Product'}</button>
        {editingProduct && <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>Cancel</button>}
      </form>
    </div>
  );
};

export default ProductForm;
