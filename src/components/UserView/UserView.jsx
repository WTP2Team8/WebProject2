import Button from "../Button";

const UserView = ({ user, handleBlock, text}) => {
  return (
    <tr>
      <td>{user.handle}</td>
      <td>{user.email}</td>
      <td>No</td>
      <td>
        <Button onClick={() => handleBlock(user.handle)}>{text}</Button>
      </td>
    </tr>
  );
};

export default UserView;
