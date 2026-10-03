import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, setCurrentUser, removeCurrentUser, getUsers, saveUser, updateUserProfileInStorage } from '../utils/storage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getCurrentUser();
    if (session) {
      setUser(session);
    }
    setLoading(false);
  }, []);

  const signup = ({ name, username, email, password }) => {
    const existingUsers = getUsers();
    
    const emailExists = existingUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      throw new Error('An account with this email address already exists.');
    }

    const usernameExists = existingUsers.some(u => u.username.toLowerCase() === username.toLowerCase());
    if (usernameExists) {
      throw new Error('This username is already taken. Please choose another.');
    }

    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      username,
      email,
      password,
      joinedDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${username}`
    };

    saveUser(newUser);
    
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      joinedDate: newUser.joinedDate
    };
    
    setCurrentUser(sessionUser);
    setUser(sessionUser);
    return sessionUser;
  };

  const login = (emailOrUsername, password) => {
    const users = getUsers();
    const target = users.find(u => 
      (u.email.toLowerCase() === emailOrUsername.toLowerCase() || u.username.toLowerCase() === emailOrUsername.toLowerCase()) &&
      u.password === password
    );

    if (!target) {
      throw new Error('Invalid email/username or password. Please try again.');
    }

    const sessionUser = {
      id: target.id,
      name: target.name,
      username: target.username,
      email: target.email,
      avatar: target.avatar,
      joinedDate: target.joinedDate
    };

    setCurrentUser(sessionUser);
    setUser(sessionUser);
    return sessionUser;
  };

  const logout = () => {
    removeCurrentUser();
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!user) return;

    const existingUsers = getUsers();

    // If changing email, check uniqueness
    if (updatedFields.email && updatedFields.email.toLowerCase() !== user.email.toLowerCase()) {
      const emailTaken = existingUsers.some(u => u.id !== user.id && u.email.toLowerCase() === updatedFields.email.toLowerCase());
      if (emailTaken) {
        throw new Error('This email is already in use by another account.');
      }
    }

    // If changing username, check uniqueness
    if (updatedFields.username && updatedFields.username.toLowerCase() !== user.username.toLowerCase()) {
      const usernameTaken = existingUsers.some(u => u.id !== user.id && u.username.toLowerCase() === updatedFields.username.toLowerCase());
      if (usernameTaken) {
        throw new Error('This username is already taken. Please choose another.');
      }
    }

    const originalUsername = user.username;
    const updated = { ...user, ...updatedFields };

    updateUserProfileInStorage(originalUsername, updated);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
