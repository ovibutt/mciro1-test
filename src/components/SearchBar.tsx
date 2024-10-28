import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCity } from "../store/weatherSlice";
import { FormDataInterface } from "types/components";
import Select from "react-select";
import cities from "../utils/cities.json";
import { useDebounce } from "use-debounce";
import { TopCitiesWeather } from "screens";

const SearchBar: React.FC = () => {
  const { handleSubmit } = useForm<FormDataInterface>();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [options, setOptions] = useState<any>([]);
  const [query, setQuery] = useState("");
  const [debouncedText] = useDebounce(query, 500);

  useEffect(() => {
    loadCities();
  }, [debouncedText]);

  const onSubmit = () => {
    if (selectedOption) {
      // console.log("Selected city:", selectedOption.value);
      dispatch(setCity(selectedOption.value));
    }
  };

  async function loadCities() {
    try {
      const transformedCities = cities
        //@ts-ignore
        .filter((item: any) =>
          item.name.toLowerCase().includes(debouncedText.toLowerCase())
        )
        .slice(0, 1000)
        .map((item: any) => ({
          value: item.name,
          label: `${item.name}${
            item?.country === "US" ? ", " + item.admin1 : ", " + item.country
          }`,
        }));
      setOptions(transformedCities);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  }

  return (
    <>
      <TopCitiesWeather />

      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="flex items-center">
          <Select
            value={selectedOption} // Ensure the selected option is set correctly
            onChange={(option) => setSelectedOption(option)}
            isSearchable={true}
            className="w-full"
            options={options}
            onInputChange={(text) => setQuery(text)} // Update the search query
            isClearable
            placeholder="Search a city here"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchBar;
