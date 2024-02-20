import { useEffect, useState } from "react";
import Button from "../Button";
import {
  getAllUsers,
  updateAdminStatus,
  updateBlockedUser,
  updateUnblockedUser,
} from "../../services/users.service";
import { deletePost, getAllPosts } from "../../services/posts.service";
import UserView from "../UserView/UserView";

const Admin = () => {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState(null);
  const [blockedUsers, setBlockedUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    getAllUsers().then((result) => {
      setUsers(result.filter((user) => !user.isBlocked));
      setBlockedUsers(result.filter((user) => user.isBlocked));
    });
    getAllPosts().then((result) => setPosts(result));
  }, [blocked]);

  const handleBlock = (userHandle) => {
    updateBlockedUser(userHandle).then(() => setBlocked(!blocked));
  };

  const handleUnblock = (userHandle) => {
    updateUnblockedUser(userHandle).then(() => setBlocked(!blocked));
  };

  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => setBlocked(!blocked));
  };

  const changeAdminStatus = (userHandle) => {
    updateAdminStatus(userHandle).then(() => setBlocked(!blocked));
  };

  return (
    <div className="admin-content">
      <div className="admin-header flex justify-center space-x-4">
        <Button onClick={() => setPage(1)}>Потребители</Button>
        <Button onClick={() => setPage(2)}>Блокирани потребители</Button>
        <Button onClick={() => setPage(3)}>Публикации</Button>
      </div>
      <div className="admin-main">
        {page === 1 && (
          <div className="admin-page">
            <h1 className="text-2xl font-bold mb-4">Потребители:</h1>
            <table className="w-full">
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
                  <UserView
                    key={user.id}
                    text={"Block"}
                    user={user}
                    handleBlock={handleBlock}
                    changeAdminStatus={changeAdminStatus}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {page === 2 && (
          <div className="admin-page">
            <h1 className="text-2xl font-bold mb-4">Блокирани потребители:</h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th>Unblock user</th>
                </tr>
              </thead>
              <tbody>
                {blockedUsers?.map((user) => (
                  <UserView
                    key={user.id}
                    text={"Unblock"}
                    user={user}
                    handleBlock={handleUnblock}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {page === 3 && (
          <div className="admin-page">
            <h1 className="text-2xl font-bold mb-4 font-serif mb-3">Публикации:</h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Created On</th>
                  <th>Delete Post</th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post) => (
                  <tr key={post.id}>
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>No</td>
                    <td>
                      <Button onClick={() => handleDeletePost(post.id)}>
                        Изтрии
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="admin-footer"></div>
    </div>
  );
 }
export default Admin;
