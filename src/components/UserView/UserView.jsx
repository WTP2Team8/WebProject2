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

export default UserView;
