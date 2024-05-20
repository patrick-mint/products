import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import axios from 'axios';
import Header from './header/Header';
import { Container, Row, Col } from 'react-bootstrap'; 
import SearchInput from './components/SearchInput';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProductList, setShowProductList] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (searchQuery.trim() === '') {
          const response = await axios.get(`http://localhost:8080/api/v1/products`);
          setProducts(response.data);
          setShowProductList(true);
        } else {
          console.log('Search Query:', searchQuery);
          const response = await axios.get(`http://localhost:8080/api/v1/products/search?name=${searchQuery}`);
          setProducts(response.data);
          setShowProductList(true);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, [searchQuery]);
  

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddProduct = (product) => {
    setProducts([...products, product]);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleProductUpdated = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <Header />
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <div style={{ width: '100%' }}>
              <ProductForm
                editingProduct={editingProduct}
                onAdd={handleAddProduct}
                onProductUpdated={handleProductUpdated}
                onCancelEdit={handleCancelEdit}
              />
            </div>
            <div className="search-container">
              <SearchInput onSearch={handleSearch} />
            </div>
            {showProductList && (
              <div style={{ width: '100%' }}>
                <ProductList
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
