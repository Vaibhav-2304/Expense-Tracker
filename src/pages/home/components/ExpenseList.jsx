import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from react-icons

const Tile = ({index, imageSrc, title, amount, onEdit, onDelete }) => {
  return (
    <div className="flex items-center p-4 m-4 border border-gray-300 rounded-lg shadow-sm bg-white">
    {/* Index */}
    <p className="text-gray-800 text-xl mr-4">{index+"."}</p>

      {/* Circular Image */}
      <div className="flex-shrink-0">
        <img
          src={imageSrc}
          alt={title}
          className="w-16 h-16 rounded-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="ml-4 flex-grow">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-600 text-lg font-semibold">{amount}</p>
      </div>

      {/* Action Icons */}
      <div className="ml-4 flex items-center space-x-2">
        <button
          onClick={onEdit}
          className="text-xl text-slate-600 hover:text-slate-950 mr-2"
          aria-label="Edit"
        >
          <FaEdit />
        </button>
        <button
          onClick={onDelete}
          className="text-xl text-red-500 hover:text-red-700"
          aria-label="Delete"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default Tile;
