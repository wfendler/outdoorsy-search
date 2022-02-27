import { ChangeEvent, useState, useCallback } from "react";
import debounce from "lodash.debounce";

import SearchResult from "./SearchResult";
import Loading from "./Loading";
import Error from "./Error";

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

type FormStateType = {
  state: "IDLE" | "LOADING" | "LOADED" | "ERROR";
  error?: string;
  data?: ResultsType;
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [formState, setFormState] = useState<FormStateType>({
    state: "IDLE",
    data: undefined,
    error: undefined,
  });

  const fetchResults = (searchQuery: string) => {
    const endpoint = `https://search.outdoorsy.com/rentals?filter[keywords]=${encodeURI(
      searchQuery
    )}`;

    setFormState({
      ...formState,
      state: "LOADING",
      error: undefined,
    });

    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        setFormState({
          state: "LOADED",
          data: json,
        });
      })
      .catch((error) => {
        setFormState({
          state: "ERROR",
          error: error?.message,
        });
      });
  };

  const fetchResultsDebounced = useCallback(
    debounce((searchQuery) => fetchResults(searchQuery), 400),
    []
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    setFormState({
      ...formState,
      state: "IDLE",
      data: undefined,
    });
    if (inputValue.length < 1) return;
    return fetchResultsDebounced(inputValue);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.length < 1) return;
    fetchResults(query);
  };

  return (
    <>
      <form
        className="mb-8"
        onSubmit={handleSubmit}
        action="https://search.outdoorsy.com/rentals"
        role="search"
        aria-label="Outdoorsy Listings"
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

      <div role="region" aria-live="polite">
        {formState.state === "ERROR" && <Error message={formState.error} />}

        {formState.state === "LOADING" && <Loading />}

        {(formState.state === "LOADED" || formState.state === "IDLE") &&
          formState.data && (
            <>
              <div className="space-y-10">
                {formState?.data?.data?.length > 0 ? (
                  <>
                    <div className="sr-only" role="status" aria-live="polite">
                      {formState.data.data.length}
                      {formState.data.data.length > 1
                        ? "results"
                        : "result"}{" "}
                      for {query}.
                    </div>
                    {formState?.data?.data.map((el) => {
                      const imageId =
                        el?.relationships?.primary_image?.data?.id;
                      const img = formState?.data?.included.find(
                        (img) => img.id === imageId && img.type === "images"
                      );
                      const imgUrl = img?.attributes?.url;
                      return (
                        <SearchResult
                          key={el.id}
                          id={el.id}
                          slug={el.attributes.slug}
                          imgUrl={imgUrl}
                          name={el.attributes.name}
                        />
                      );
                    })}
                  </>
                ) : (
                  <div>
                    No results for <span className="font-bold">{query}</span>.
                  </div>
                )}
              </div>
            </>
          )}
      </div>
    </>
  );
};

export default Search;
