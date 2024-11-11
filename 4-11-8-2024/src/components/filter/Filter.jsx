import React from "react";

const Filter = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>

      <div className="space-y-3">
        <div>
          <label
            htmlFor="shopName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Shop Name
          </label>
          <input
            id="shopName"
            type="text"
            placeholder="Search by shop name"
            value={filters.shopName || ""}
            onChange={(e) => onFilterChange("shopName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            id="productName"
            type="text"
            placeholder="Search by product name"
            value={filters.productName || ""}
            onChange={(e) => onFilterChange("productName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Minimum Stock
          </label>
          <input
            id="stock"
            type="number"
            placeholder="Minimum stock"
            value={filters.stock || ""}
            onChange={(e) => onFilterChange("stock", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            User Name
          </label>
          <input
            id="userName"
            type="text"
            placeholder="Search by user name"
            value={filters.userName || ""}
            onChange={(e) => onFilterChange("userName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
