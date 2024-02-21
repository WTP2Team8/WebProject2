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
import "./Admin.css";

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
    deletePost(postId)
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
      <br />
      <br />
      <div className="admin-main">
        {page === 1 && (
          <div className="admin-page">
            <table className="w-full">
              <thead className="admin">
                <tr>
                  <th className="username">Потребителско име</th>
                  <th className="email">Имейл</th>
                  <th className="admin">Админ</th>
                  <th className="blocked">Отблокирай потребител</th>
                </tr>
                <br />
              </thead>
              <tbody className="id2">
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
            <table className="w-full">
              <br />
              <thead>
                <tr>
                  <th>Потребителско име</th>
                  <th>Имейл</th>
                  <th>Админ</th>
                  <th>Отблокирай потребител</th>
                </tr>
              </thead>
              <tbody className="id1">
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
            <h1 className="text-2xl font-bold mb-4 font-serif mb-3"></h1>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Заглавие</th>
                  <th>Автор</th>
                  <th>Създаден на</th>
                  <th>Премахни</th>
                </tr>
              </thead>
              <br />
              <tbody>
                {posts?.map((post) => (
                  <tr key={post.id} className="id">
                    <td>{post.title}</td>
                    <td>{post.author}</td>
                    <td>{post.createdOn}</td>

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
};
export default Admin;
