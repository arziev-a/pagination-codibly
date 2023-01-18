import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicModal  from "./components/modal";
import { useHistory } from 'react-router-dom';
import './App.css'
function App() {
  const [products, setProducts] = useState([]);
  const [idFilter, setIdFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [modalOpen, setModalOpen] = useState(false)
  // handling the routing
  // const history = useHistory();
  // fetching the data 
  useEffect(() => {
    const url = `https://reqres.in/api/products?per_page=5&page=${currentPage}`
    axios
      .get(url, {
        params: {
          id: idFilter,
          page: currentPage,
          limit: 4
        }
      })
      .then((response) => {
        // console.log(response.data.data)
        if (
          typeof response.data === 'object' &&
          !Array.isArray(response.data.data) &&
          response.data !== null
      ) {
          const newObj = { data:[] }
          newObj.data.push(response.data.data)
          setProducts(newObj)
      }else {
        setProducts(response.data)
      }
      setTotalPages(response.data.totalPages);
      // updating the URL when the filter or page changes
      window.history.pushState({}, '', `/products?id=${idFilter}&page=${currentPage}`);
    
      });
  }, [idFilter, currentPage]);

  // Listening for changes in the URL
  useEffect(() => {
    window.onpopstate = () => {
      const searchParams = new URLSearchParams(window.location.search);
      setIdFilter(searchParams.get('id') || '');
      setCurrentPage(searchParams.get('page') || 1);
    }
  }, []);

  const handleIdFilterChange = (event) => {
    setIdFilter(event.target.value);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setModalOpen(true)
  };

  const handleModalClose = () => {
    setModalOpen(false)
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <input
        type="number"
        value={idFilter}
        onChange={handleIdFilterChange}
        placeholder="Filter by ID"
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody><>
          {products.data 
            ? products.data.map((product) => (
              <>
              <tr
                key={product.id}
                style={{ backgroundColor: product.color, border: "1px solid #ddd", cursor:'pointer'}}
                onClick={() => handleProductSelect(product)}
              >
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.year}</td>
              </tr>
              </>
            )) : "loading"}
           
            </>
        </tbody>
      </table>
      <div>
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <button disabled={!products.data || products.data.length < 5 || products.data.length === 1} onClick={handleNextPage}>
          Next
        </button>
      </div>
      {selectedProduct && (
         <BasicModal 
         handleProductSelect={handleProductSelect}
         handleModalClose={handleModalClose}
         modalOpen={modalOpen}
         selectedProduct={selectedProduct}
       />
      )}
    </div>
  );
}

export default App;
