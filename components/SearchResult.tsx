import Image from "next/image";

type SearchResultProps = {
  slug: string;
  imgUrl?: string;
  name: string;
  id: string;
};

const SearchResult = ({
  slug,
  imgUrl = "https://via.placeholder.com/600x300?text=No+Image",
  name,
  id,
}: SearchResultProps) => {
  return (
    <div aria-labelledby={id}>
      <a
        href={`https://outdoorsy.com/${slug}`}
        className="flex items-center gap-4"
      >
        <div className="flex-none w-44 h-24 overflow-hidden rounded-lg relative">
          <Image className="object-cover" layout="fill" src={imgUrl} alt="" />
        </div>
        <h2 id={id} className="text-lg font-medium text-gray-700">
          {name}
        </h2>
      </a>
    </div>
  );
};

export default SearchResult;
