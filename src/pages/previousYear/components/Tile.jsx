import PropTypes from "prop-types";

const Tile = ({index, monthName, totalAmount}) => {
  return (
    <div className="flex items-center p-4 m-4 border border-gray-300 rounded-lg shadow-sm bg-white">
      {/* Index */}
      <p className="text-gray-800 text-xl">{index + "."}</p>

      {/* Content */}
      <div className="ml-2 flex-grow">
        <div className="flex justify-start">
          <h3 className="text-xl font-bold">{monthName} : </h3>
          <div className="w-4"></div>
          <p className="text-gray-600 text-lg font-semibold">₹{totalAmount}</p>
        </div>
      </div>
      
    </div>
  );
};

Tile.propTypes = {
  index: PropTypes.number.isRequired,
  monthName: PropTypes.string.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default Tile;
