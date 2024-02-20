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
        className="bg-orange-700 hover:bg-yellow-400 text-black font-bold py-3 px-5 rounded transition duration-300 ease-in-out" // Add this line
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
