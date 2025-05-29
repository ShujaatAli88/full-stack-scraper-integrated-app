import React, { useEffect, useState } from "react";
import "./ProductTable.css";

const PRODUCTS_PER_PAGE = 5;

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIdx = (page - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

  return (
    <div className="product-table-container">
      <h3 className="product-table-title">Product Listings</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Rating</th>
            <th>Product Image URL</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.product_id}>
              <td className="product-id">
                <span className="tooltip-hover">
                  {product.product_id}
                  <span className="tooltip-text">{product.product_id}</span>
                </span>
              </td>
              <td className="font-medium">
                <span className="tooltip-hover">
                  {product.product_name}
                  <span className="tooltip-text">{product.product_name}</span>
                </span>
              </td>
              <td>
                <span className="tooltip-hover">
                  {product.product_price}
                  <span className="tooltip-text">{product.product_price}</span>
                </span>
              </td>
              <td>
                <span className="tooltip-hover">
                  ⭐ {product.product_rating}
                  <span className="tooltip-text">{product.product_rating}</span>
                </span>
              </td>
              <td>
                <span className="tooltip-hover">
                  <a
                    href={product.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#2563eb" }}
                  >
                    {product.image_url}
                  </a>
                  <span className="tooltip-text">{product.image_url}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div className="pagination-controls" style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
