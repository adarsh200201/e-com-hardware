import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all categories
  const getAllCategories = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      } else {
        setError("Error fetching categories. Please try again later.");
      }
    } catch (error) {
      setError("Error fetching categories. Please try again later.");
    }
  }, []);

  // Fetch products
  const getAllProducts = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
      setTotal(data.total);
      setLoading(false);
    } catch (error) {
      setError("Error fetching products. Please try again later.");
      setLoading(false);
    }
  }, [page]);

  // Fetch total count of products
  const getTotal = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data.total);
    } catch (error) {
      setError(
        "Error fetching total count of products. Please try again later."
      );
    }
  }, []);

  // Filter products based on category and price
  const filterProducts = useCallback(async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      setError("Error filtering products. Please try again later.");
    }
  }, [checked, radio]);

  useEffect(() => {
    const fetchInitialData = async () => {
      await getAllCategories();
      await getTotal();
      await getAllProducts();
    };

    fetchInitialData();
  }, [getAllCategories, getTotal, getAllProducts]);

  // Apply filters and refetch products
  useEffect(() => {
    const fetchProducts = async () => {
      if (!checked.length || !radio) {
        await getAllProducts();
      } else {
        await filterProducts();
      }
    };

    fetchProducts();
  }, [checked, radio, getAllProducts, filterProducts]);

  // Auto-slide carousel images
  useEffect(() => {
    const intervalId = setInterval(() => {
      document.querySelector(".carousel-control-next").click();
    }, 3000); // Adjust the interval time as needed (in milliseconds)

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Layout title={"All Products - Best Offers"}>
      {/* Banner images */}
      <div className="carousel-wrapper">
        <div
          id="carouselExampleAutoplaying"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/images/firstpage.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item active">
              <img
                src="/images/banner.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item active">
              <img
                src="/images/hello.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img src="/images/sec.jpg" className="d-block w-100" alt="..." />
            </div>

            <div className="carousel-item">
              <img
                src="./images/gallery.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleAutoplaying"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="container-fluid row mt-5 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => {
                  if (e.target.checked) {
                    setChecked((prevChecked) => [...prevChecked, c._id]);
                  } else {
                    setChecked((prevChecked) =>
                      prevChecked.filter((item) => item !== c._id)
                    );
                  }
                }}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* Price filter */}
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group
              onChange={(e) => setRadio(e.target.value)}
              value={radio}
            >
              {Prices.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => {
                setChecked([]);
                setRadio("");
              }}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
        {/* Product Cards */}
        <div className="col-md-9">
          <h1 className="text-center1">All Products</h1>
          <div className="d-flex flex-wrap">
            {error && <div>Error: {error}</div>}
            {products.map((p, index) => (
              <div className="card m-2" key={index}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  style={{
                    maxWidth: "110%",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                  </div>
                  <p className="card-text ">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-name-price">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load more button */}
          <div className="m-2 p-3">
            {products.length < total && (
              <button
                className="btn loadmore"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading ..." : "Load More"} <AiOutlineReload />
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
