import PropTypes from 'prop-types';
import Button from "../Button";

const UserView = ({ user, handleBlock, text, changeAdminStatus }) => {
  return (
    <tr>
      <td>{user.handle}</td>
      <td>{user.email}</td>
      <td onClick={() => changeAdminStatus(user.handle)}>
        {user.isAdmin ? "Yes" : "No"}
      </td>
      <td>
        <Button onClick={() => handleBlock(user.handle)}>{text}</Button>
      </td>
    </tr>
  );
};

UserView.propTypes = {
  user: PropTypes.object.isRequired,
  handleBlock: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  changeAdminStatus: PropTypes.func.isRequired
};

export default UserView;
