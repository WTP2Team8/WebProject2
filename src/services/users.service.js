import {
  get,
  set,
  ref,
  query,
  equalTo,
  orderByChild,
  update,
} from "firebase/database";
import { db } from "../config/firebase-config.js";

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const getAllUsers = async () => {
  const snapshot = await get(ref(db, `users`));

  if (!snapshot.exists()) {
    return [];
  }

  const users = Object.keys(snapshot.val()).map((key) => ({
    id: snapshot.val()[key].uid,
    ...snapshot.val()[key],
    createdOn: new Date(snapshot.val()[key].createdOn).toString(),
    likedPosts: snapshot.val()[key].likedPosts
      ? Object.keys(snapshot.val()[key].likedPosts)
      : [],
  }));

  return users;
};

export const createUserHandle = (handle, uid, email) => {
  return set(ref(db, `users/${handle}`), {
    handle,
    uid,
    email,
    createdOn: new Date(),
    likedPosts: {},
    isAdmin: false,
    isBlocked: false,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

export const updateBlockedUser = (handle) => {
  const updateUser = {};
  updateUser[`/users/${handle}/isBlocked`] = true;

  return update(ref(db), updateUser);
};

export const updateUnblockedUser = (handle) => {
  const updateUser = {};
  updateUser[`/users/${handle}/isBlocked`] = false;

  return update(ref(db), updateUser);
};
