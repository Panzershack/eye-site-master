import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from "../assets/7014178.jpg";
import banner2 from "../assets/7038196.jpg";
import "../ProductPage.css";
import Navbar from "../components/navbar";

const ProductPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [colorFilter, setColorFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/items`)
      .then((res) => {
        setItems(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const applyCategoryFilter = (category) => {
    setCategoryFilter(category);
  };

  const applyColorFilter = (color) => {
    setColorFilter(color);
  };

  const applyCompanyFilter = (price) => {
    setCompanyFilter(price);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    // Category filter
    if (categoryFilter !== "All" && item.category !== categoryFilter) {
      return false;
    }

    // Color filter
    if (colorFilter !== "All" && item.colour !== colorFilter) {
      return false;
    }

    // Optical for filter
    if (companyFilter !== "All" && item.company !== companyFilter) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      if (
        !item.title.toLowerCase().includes(search) &&
        !item.company.toLowerCase().includes(search) &&
        !item.category.toLowerCase().includes(search)
      ) {
        return false;
      }
    }

    return true;
  });

  // Array of banner images
  const banners = [banner1, banner2];

  const settings = {
    dots: true,
    infinite: true,
    speed: 4000, // transition speed
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="background">
      <Navbar/>
      <Slider {...settings}>
        {banners.map((banner, index) => (
          <div key={index}>
            <img src={banner} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <br /><br />
      
      
{/* 
      <div className="teext">
        <h1>
          <b></b>
        </h1>
      </div> */}

      <div className="flex">
        <div className="w-1/5 p-3 border border-gray-300 rounded-md">
          <div className="bgclr">
            <br />

            {/* Sidebar with filtering options */}
            <h2 className="text-lg font-bold mb-2">Filter Options</h2>

            {/* Optical for filter */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">
                <b>Optical for</b>
              </h2>
              <div className="flex flex-col">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="All"
                    checked={companyFilter === "All"}
                    onChange={() => applyCompanyFilter("All")}
                  />
                  <span className="ml-2">All</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Sunglasses"
                    checked={companyFilter === "Gents"}
                    onChange={() => applyCompanyFilter("Gents")}
                  />
                  <span className="ml-2">Gents</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Ladies"
                    checked={companyFilter === "Ladies"}
                    onChange={() => applyCompanyFilter("Ladies")}
                  />
                  <span className="ml-2">Ladies</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Unisex"
                    checked={companyFilter === "Unisex"}
                    onChange={() => applyCompanyFilter("Unisex")}
                  />
                  <span className="ml-2">Unisex</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Kids"
                    checked={companyFilter === "Kids"}
                    onChange={() => applyCompanyFilter("Kids")}
                  />
                  <span className="ml-2">Kids</span>
                </label>
              </div>
            </div>
            <br />

            {/* Category filter */}
            <div className="mb-4">
              <h2 className="font-semibold mb-2">
                <b>Category</b>
              </h2>
              <div className="flex flex-col">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="All"
                    checked={categoryFilter === "All"}
                    onChange={() => applyCategoryFilter("All")}
                  />
                  <span className="ml-2">All</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Sunglasses"
                    checked={categoryFilter === "Sunglasses"}
                    onChange={() => applyCategoryFilter("Sunglasses")}
                  />
                  <span className="ml-2">Sunglasses</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Spectacles"
                    checked={categoryFilter === "Spectacles"}
                    onChange={() => applyCategoryFilter("Spectacles")}
                  />
                  <span className="ml-2">Spectacles</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Lenses"
                    checked={categoryFilter === "Lenses"}
                    onChange={() => applyCategoryFilter("Lenses")}
                  />
                  <span className="ml-2">Lenses</span>
                </label>
              </div>
            </div>
            <br />

            {/* Color filter */}

            <div className="mb-4">
              <h2 className="font-semibold mb-2">
                <b>Colour</b>
              </h2>
              <div className="flex flex-col">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="All"
                    checked={colorFilter === "All"}
                    onChange={() => applyColorFilter("All")}
                  />
                  <span className="ml-2">All</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Black"
                    checked={colorFilter === "Black"}
                    onChange={() => applyColorFilter("Black")}
                  />
                  <span className="ml-2">Black</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Blue"
                    checked={colorFilter === "Blue"}
                    onChange={() => applyColorFilter("Blue")}
                  />
                  <span className="ml-2">Blue</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Brown"
                    checked={colorFilter === "Brown"}
                    onChange={() => applyColorFilter("Brown")}
                  />
                  <span className="ml-2">Brown</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Green"
                    checked={colorFilter === "Green"}
                    onChange={() => applyColorFilter("Green")}
                  />
                  <span className="ml-2">Green</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="Red"
                    checked={colorFilter === "Red"}
                    onChange={() => applyColorFilter("Red")}
                  />
                  <span className="ml-2">Red</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio h-5 w-5 text-indigo-600"
                    value="White"
                    checked={colorFilter === "White"}
                    onChange={() => applyColorFilter("White")}
                  />
                  <span className="ml-2">White</span>
                </label>
              </div>
            </div>
          
        </div>
        </div>

        <div className="w-3/4 p-4">
          {/* Product grid */}
          <h1 className="text-3xl my-8">
            {" "}
            <b>Our Products</b>{" "}
          </h1>
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search ..."
              className="search-input"
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          <br />
          <br />

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filteredItems.map((item) => (
                <div key={item._id} className="card-wrapper">
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.image}
                        alt={item.title}
                        className="card-image"
                      />
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ textAlign: "center" }}
                      >
                        {item.title}
                      </Typography>

                      <CardContent className="card-content">
                        <div className="card-price">Price: {item.price}</div>
                        <br />
                        <div className="card-company">
                          Optical for: {item.company}
                        </div>
                        <br />

                        <div className="card-category">
                          Category: {item.category}
                        </div>
                        <br />
                        <div className="card-color">Colour: {item.colour}</div>
                        <br />
                        <div className="card-description">
                          Description: {item.description}
                        </div>
                        <br />
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
