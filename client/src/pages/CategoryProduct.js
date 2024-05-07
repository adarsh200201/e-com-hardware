import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
import useCategory from "../hooks/useCategory";
import { PropagateLoader } from "react-spinners";

const CategoryProduct = () => {
  const categories = useCategory();
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(5); // Countdown seconds
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }, []);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
    // eslint-disable-next-line
  }, [params?.slug]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    // Redirect to the first product when count reaches 0
    if (count === 0 && products.length > 0) {
      clearInterval(countdownInterval);
      navigate(`/product/${products[0].slug}`);
    }

    // Cleanup interval
    return () => clearInterval(countdownInterval);
  }, [count, navigate, products]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setShowResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <h4 className="text-center">Category - {categories?.name}</h4>
        {loading && !showResults && <h6 className="text-center">Loading...</h6>}
        {!loading && showResults && (
          <h6 className="text-center">{products?.length} result found</h6>
        )}
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {loading ? (
                <div className="loader-container">
                  <div className="loader-wrapper">
                    <PropagateLoader
                      color="#d6367c"
                      loading={loading}
                      size={25}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                  <h1 className="redirect-message">
                    Redirecting to you in {count} seconds
                  </h1>
                </div>
              ) : (
                products?.map((p) => (
                  <div className="card m-2" key={p._id}>
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
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
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
