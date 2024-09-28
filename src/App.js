import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Grid, CircularProgress, TextField, ThemeProvider, createTheme, Card, CardContent, CardMedia } from "@mui/material";
import CategorySelector from './components/CategorySelector';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default function App() {
  const [data, setData] = useState([]); // Products data
  const [categories, setCategories] = useState([]); // Categories data
  const [selectedCategory, setSelectedCategory] = useState(null); // Selected category
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [currentPage, setCurrentPage] = useState(0); // Current page for fetching products
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        // Fetch products
        const response = await axios.get(`https://dummyjson.com/products?skip=${currentPage * 10}&limit=10`);
        setData(prevData => [...prevData, ...response.data.products]);

        // Fetch categories
        const categoryResponse = await axios.get("https://dummyjson.com/products/categories");
        setCategories(categoryResponse.data); // Assuming this is the correct structure
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentPage]); // Fetch products when currentPage changes

  // Filter products based on selected category and search term
  const filteredProducts = data.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Product List</Typography>
          </Toolbar>
        </AppBar>

        <div style={{ padding: "20px" }}>
          <CategorySelector 
            categories={categories} 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
          <TextField 
            label="Search Products" 
            variant="outlined" 
            fullWidth 
            onChange={e => setSearchTerm(e.target.value)} 
            style={{ margin: "20px 0" }} 
          />
          
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={2}>
              {filteredProducts.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    sx={{
                      '&:hover': {
                        boxShadow: 20, // Increase shadow on hover
                        transform: 'scale(1.05)', // Scale effect on hover
                      },
                      transition: '0.3s',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={product.images[0]}
                      alt={product.title}
                    />
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.description}
                      </Typography>
                      <Typography variant="h6" style={{ marginTop: "10px" }}>
                        ${product.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          <Button 
            variant="contained" 
            onClick={() => setCurrentPage(prev => prev + 1)} 
            style={{ marginTop: "20px" }} 
            disabled={loading}
            aria-label="Load more products" // Accessibility improvement
          >
            Load More
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}
