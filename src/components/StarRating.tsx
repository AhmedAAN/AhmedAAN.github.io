import { FaRegStar, FaStar } from "react-icons/fa";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <div
            key={starValue}
            onClick={() => onChange(starValue)}
            className="cursor-pointer"
          >
            {starValue <= value ? (
              <FaStar className="text-yellow-300" />
            ) : (
              <FaRegStar className="text-yellow-300" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
