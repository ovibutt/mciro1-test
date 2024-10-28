import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCity } from "../store/weatherSlice";
import { FormDataInterface } from "types/components";
import Select from "react-select";
import cities from "../utils/cities.json";
import { useDebounce } from "use-debounce";
import { TopCitiesWeather } from "screens";

const SearchBar: React.FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataInterface>();
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [options, setOptions] = useState<any>([]);
  const [query, setQuery] = useState("");
  const [debouncedText] = useDebounce(query, 500);

  useEffect(() => {
    loadCities();
  }, [debouncedText]);

  const onSubmit = (data: FormDataInterface) => {
    console.log("data: ", selectedOption?.value);
    dispatch(setCity(selectedOption?.value));
  };

  async function loadCities() {
    try {
      console.log("debouncedText; ", debouncedText);
      const transformedCities = [cities]
        .filter((item: any) => item.name.toLowerCase().includes(debouncedText))
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
          {/* <input
            {...register("city", { required: "City is required" })}
            className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter city name"
          /> */}
          {/* <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            isSearchable={true}
            className="w-full"
            options={options}
            onInputChange={(text) => setQuery(text)}
            isClearable
            placeholder="Search a city here"
          /> */}
          <Controller
            name="city"
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                placeholder="Select a city here"
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                isSearchable={true}
                className="w-full"
                onInputChange={(text) => setQuery(text)}
                isClearable
              />
            )}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
        {errors.city && (
          <p className="mt-2 text-red-500">{errors.city.message}</p>
        )}
      </form>
    </>
  );
};

export default SearchBar;
