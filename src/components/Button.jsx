import PropTypes from "prop-types";

/**
 *
 * @param {{ children: any, onClick: function }} props
 * @returns
 */
export default function Button({ children = null, onClick = () => {} }) {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-yellow-500 hover:bg-green-700 text-black font-bold py-1 px-3 rounded transition duration-300 ease-in-out" // Add this line
      >
        {children}
      </button>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
};
