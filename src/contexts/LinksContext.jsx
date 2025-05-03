'use client'
import { createContext, useState } from 'react';

export const LinksContext = createContext();

export function LinksProvider({ children }) {
  const [links, setLinks] = useState([]);

  const addLink = (newLink) => setLinks([...links, newLink]);
  const updateLink = (id, updatedLink) =>
    setLinks(links.map(link => link.id === id ? updatedLink : link));
  const deleteLink = (id) => setLinks(links.filter(link => link.id !== id));

  return (
    <LinksContext.Provider value={{ links, addLink, updateLink, deleteLink, setLinks }}>
      {children}
    </LinksContext.Provider>
  );
}