import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db } from "../config/firebase-config.js";


export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const getAllUsers = async () => {
  const snapshot = await get(ref(db, `users`));

  if (!snapshot.exists()) {
    return [];
  }

  const users = Object.keys(snapshot.val()).map(key => ({
    id: key,
    ...snapshot.val()[key],
    createdOn: new Date(snapshot.val()[key].createdOn).toString(),
    likedPosts: snapshot.val()[key].likedPosts ? Object.keys(snapshot.val()[key].likedPosts) : [],
  }))

  return users;
};

export const createUserHandle = (handle, uid, email) => {
  return set(ref(db, `users/${handle}`), {
    handle,
    uid,
    email,
    createdOn: new Date(),
    likedPosts: {},
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};
