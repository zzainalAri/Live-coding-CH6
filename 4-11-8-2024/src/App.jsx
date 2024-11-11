import { useEffect, useState } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import NavbarWithStyling from "./components/navbar/navbarWithStyling";
import Button from "./components/Elements/button/HoverButton";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AboutView from "./page/AboutView";
import HomeView from "./page/HomeView";
import NotFoundView from "./page/NotFoundView";
import { LoginPage } from "./page/Login";
import { RegisterPage } from "./page/Register";
import FilterComponent from "./components/filter/Filter";
import PaginationComponent from "./components/pagination/Pagination";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/about",
    element: <AboutView />,
  },
  {
    path: "/not-found",
    element: <NotFoundView />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
function App() {
  // store data secara state reactnya
  const [shops, setShops] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const listMenu = ["Home", "About", "Logout"];

  // Filter and pagination state
  const [filters, setFilters] = useState({
    shopName: "",
    productName: "",
    stock: "",
    userName: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          page: currentPage,
          size: pageSize,
          ...(filters.shopName && { shopName: filters.shopName }),
          ...(filters.productName && { productName: filters.productName }),
          ...(filters.stock && { stock: filters.stock }),
          ...(filters.userName && { userName: filters.userName }),
        });

        const response = await axios.get(
          `http://localhost:3000/api/v1/shops?${queryParams}`
        );
        const data = response.data;

        if (data.isSuccess) {
          setShops(data.data.shops);
          setTotalPages(data.data.pagination.totalPages);
        } else {
          setError("Error fetching data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, [filters, currentPage, pageSize]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* header */}
      <header className="flex justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold text-blue-800">Binar Car Rental</h1>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-800">
              Our Services
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-800">
              Why Us
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-800">
              Testimonial
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-800">
              FAQ
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="/login">
            <button className="px-4 py-2 text-blue-800 border border-blue-800 rounded-md hover:bg-blue-800 hover:text-white transition-colors">
              Login
            </button>
          </a>
          <a href="/register">
            <button className="px-4 py-2 text-white bg-blue-800 rounded-md hover:bg-blue-900 transition-colors">
              Register
            </button>
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <FilterComponent
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-800"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && shops.length > 0 && (
          <div className="space-y-8">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shops.map((shop, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]"
                >
                  <div className="relative h-48">
                    <img
                      src={
                        shop.products[0]?.images?.[0] || "/placeholder-car.jpg"
                      }
                      alt={shop.products[0]?.name || "Car"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-lg">
                        {shop.products[0]?.name || "Product Name"}
                      </h3>
                      <p className="text-green-600 font-bold text-xl">
                        {shop.products[0]?.price
                          ? `Rp ${Number(shop.products[0].price).toLocaleString(
                              "id-ID"
                            )}`
                          : "Price not available"}
                      </p>
                    </div>

                    <div className="mb-3">
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Shop:</span> {shop.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium">Stock:</span>{" "}
                        {shop.products[0]?.stock || 0} units
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-gray-500 text-sm mb-4">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        4 Orang
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Manual
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        2020
                      </span>
                    </div>

                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                      Pilih Mobil
                    </button>
                  </div>
                </div>
              ))}
            </section>

            {shops.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No cars found matching your criteria
                </p>
              </div>
            )}

            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
