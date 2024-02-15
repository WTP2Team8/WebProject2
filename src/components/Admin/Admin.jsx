import { useEffect, useState } from "react";
import Button from "../Button";
import { getAllUsers } from "../../services/users.service";
import { getAllPosts } from "../../services/posts.service";

const Admin = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState(null);
  const [posts, setPosts] = useState(null);

//   console.log(users);

  useEffect(() => {
    getAllUsers().then((result) => setUsers(result));
    getAllPosts().then((result) => setPosts(result));
  }, []);

  const handleBlock = () => {}

  return (
    <div className="admin-content">
      <div className="admin-header">
        <Button onClick={() => setPage(1)}>Users</Button>
        <Button onClick={() => setPage(2)}>Blocked Users</Button>
        <Button onClick={() => setPage(3)}>Posts</Button>
      </div>
      <div className="admin-main">
        {page === 1 && (
          <div className="admin-page">
            <h1>Users:</h1>
            <table>
              <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Block User</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.handle}</td>
                    <td>{user.email}</td>
                    <td>No</td>
                    <td><Button onClick={handleBlock}>Block</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {page === 2 && <div>blocked</div>}
        {page === 3 && <div>posts</div>}
      </div>
      <div className="admin-footer"></div>
    </div>
  );
};

export default Admin;
