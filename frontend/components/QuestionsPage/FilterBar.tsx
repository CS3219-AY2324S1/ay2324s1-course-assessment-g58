// FilterBar.tsx
import * as React from 'react';
import FilterSelector from './FilterSelector'; // Import your FilterSelector component
import { Box, Button, Grid, Typography } from '@mui/material';

interface FilterBarProps {
  categoryOptions: { value: number; label: string }[];
  difficultyOptions: { value: number; label: string }[];
  onApplyFilters: (selectedCategories: string[], selectedDifficulties: string[]) => void; // Update types here
  onResetFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  categoryOptions,
  difficultyOptions,
  onApplyFilters,
  onResetFilters,
}) => {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]); // Update type here
    const [selectedDifficulties, setSelectedDifficulties] = React.useState<string[]>([]); // Update type here

  const handleApplyFilters = () => {
    onApplyFilters(selectedCategories, selectedDifficulties);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulties([]);
    onResetFilters();
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item>
          <Box>
            <Typography variant="h6" gutterBottom>
              Category
            </Typography>
            <FilterSelector
              options={categoryOptions}
              selectedValues={selectedCategories}
              onChange={setSelectedCategories}
            />
          </Box>
        </Grid>
        <Grid item>
          <Box>
            <Typography variant="h6" gutterBottom>
              Difficulty
            </Typography>
            <FilterSelector
              options={difficultyOptions}
              selectedValues={selectedDifficulties}
              onChange={setSelectedDifficulties}
            />
          </Box>
        </Grid>
        <Grid item>
          <Button
            onClick={handleApplyFilters}
            variant="contained"
            className="bg-blue-400"
          >
            Apply Filters
          </Button>
        </Grid>
        <Grid item>
          <Button
            onClick={handleResetFilters}
            variant="contained"
            className="bg-blue-400"
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>
    </Box>
    
      );
};

export default FilterBar;
