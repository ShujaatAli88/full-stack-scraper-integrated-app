import React, { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [averagePrice, setAveragePrice] = useState(0);
    const [topRatedProduct, setTopRatedProduct] = useState("N/A");
    const [lastScraped, setLastScraped] = useState("N/A");

    useEffect(() => {
        fetch("http://localhost:5000/api/products/stats")
            .then((res) => res.json())
            .then((data) => {
                setTotalProducts(data.count);
                setAveragePrice(data.average_price);
                setTopRatedProduct(data.top_rated_product);
                setLastScraped(data.last_scraped);
            });
    }, []);

    const stats = [
        { name: "Total Products", value: totalProducts },
        { name: "Average Price", value: `$${averagePrice}` },
        { name: "Top Rated Product", value: topRatedProduct },
        { name: "Last Crawl", value: lastScraped },
    ];

    return (
        <div className="dashboard-grid">
            {stats.map((stat, i) => (
                <div className="dashboard-card" key={i}>
                    <h2>{stat.name}</h2>
                    <p>{stat.value}</p>
                </div>
            ))}
        </div>
    );
};

export default Dashboard;
