// FilterBar.tsx
import * as React from 'react';
import FilterSelector from './FilterSelector'; // Import your FilterSelector component

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
    <div>
      <FilterSelector options={categoryOptions} selectedValues={selectedCategories} onChange={setSelectedCategories} />
      <FilterSelector options={difficultyOptions} selectedValues={selectedDifficulties} onChange={setSelectedDifficulties} />
      <button onClick={handleApplyFilters}>Apply Filters</button>
      <button onClick={handleResetFilters}>Reset Filters</button>
    </div>
  );
};

export default FilterBar;
