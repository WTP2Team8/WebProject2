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
        style={{ cursor: "pointer" }} // Add this line
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
