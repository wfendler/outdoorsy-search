import Image from "next/image";

type SearchResultProps = {
  slug: string;
  imgUrl?: string;
  name: string;
};

const SearchResult = ({
  slug,
  imgUrl = "https://via.placeholder.com/600x300?text=No+Image",
  name,
}: SearchResultProps) => {
  return (
    <div>
      <a
        href={`https://outdoorsy.com/${slug}`}
        className="flex items-center gap-4"
      >
        <div className="flex-none w-44 h-24 overflow-hidden rounded-lg relative">
          <Image className="object-cover" layout="fill" src={imgUrl} alt="" />
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">{name}</h3>
        </div>
      </a>
    </div>
  );
};

export default SearchResult;
