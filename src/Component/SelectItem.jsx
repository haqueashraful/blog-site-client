import Select from "react-select";

const SelectItem = ({ selectedCategory, handleCategoryChange }) => {
  return (
    <div className=" flex gap-4">
      <Select
      className="w-60 z-auto text-black"
        id="category"
        value={selectedCategory || "Filter by Category"}
        onChange={handleCategoryChange}
        options={[
            { value: "", label: "All" },
          { value: "technology", label: "Technology" },
          { value: "food", label: "Food" },
          { value: "travel", label: "Travel" }
        ]}
      />
    </div>
  );
};

export default SelectItem;
