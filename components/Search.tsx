import Image from "next/image";
import { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState();
  const [results, setResults] = useState();

  const handleChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const endpoint = `https://search.outdoorsy.com/rentals?filter=${query}`;
    console.log(endpoint);

    const results = fetch(endpoint)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setResults(result?.data);
        },
        (error) => {
          console.error(error);
        }
      );
  };

  return (
    <>
      <form
        className="mb-4"
        onSubmit={handleSubmit}
        action="https://search.outdoorsy.com/rentals"
      >
        <label className="sr-only" htmlFor="search">
          Search
        </label>
        <input
          id="search"
          name="search"
          type="search"
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded-md appearance-none"
        />
        <button className="sr-only">Search</button>
      </form>
      {results && (
        <div className="space-y-10">
          {results.map((el) => {
            return (
              <div key={el.id}>
                <div className="flex items-center gap-4">
                  <div className="w-52 h-32 overflow-hidden rounded-lg relative">
                    <Image
                      className="object-cover"
                      layout="fill"
                      src={el.attributes.primary_image_url}
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">
                      {el.attributes.name}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Search;
