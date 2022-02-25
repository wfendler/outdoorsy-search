import { ChangeEvent, useState } from "react";

import SearchResult from "./SearchResult";
import Loading from "./Loading";

type ResultsType = {
  data: [
    {
      id: string;
      attributes: {
        name: string;
        slug: string;
      };
      relationships: {
        primary_image?: {
          data: {
            id: string;
          };
        };
      };
    }
  ];
  included: [
    {
      id: string;
      type: string;
      attributes: {
        url: string;
      };
    }
  ];
};

const Search = () => {
  //
  // TODO: Add error state
  //
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ResultsType>();
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setResults(undefined);
  };

  //
  // TODO: Move to handleChange + debounce instead of form submission
  //
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const endpoint = `https://search.outdoorsy.com/rentals?filter[keywords]=${query}`;

    event.preventDefault();

    setLoading(true);

    fetch(endpoint)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setResults(result);
        },
        (error) => {
          console.error(error);
        }
      )
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <form
        className="mb-8"
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
          placeholder="Search"
          onChange={handleChange}
          className="block w-full p-4 border border-gray-400 rounded-md appearance-none"
        />
        <button className="sr-only">Search</button>
      </form>

      {loading && <Loading />}

      {query && results?.data && (
        <div className="space-y-10">
          {results.data.map((el) => {
            const imageId = el?.relationships?.primary_image?.data?.id;
            const img = results.included.find(
              (img) => img.id === imageId && img.type === "images"
            );
            const imgUrl = img?.attributes?.url;
            return (
              <SearchResult
                key={el.id}
                slug={el.attributes.slug}
                imgUrl={imgUrl}
                name={el.attributes.name}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Search;
