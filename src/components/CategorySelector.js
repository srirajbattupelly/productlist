import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CategorySelector = ({ categories, selectedCategory, setSelectedCategory }) => {
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Categories</InputLabel>
      <Select
        value={selectedCategory || ''}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.slug} value={category.slug}>
            {category.name} {/* Ensure this is correct */}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelector;
