import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

let itemsDb = [
  { id: "1", title: "Premium Laptop", price: 1200, brand: "Dell" },
  { id: "2", title: "Wireless Mouse", price: 45, brand: "Logitech" },
  { id: "3", title: "Mechanical Keyboard", price: 90, brand: "Keychron" },
  { id: "4", title: "4K Monitor", price: 350, brand: "Dell" },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (req.method === 'GET') {
    if (!session) {
      // Rule: No session -> display 3 products only
      return res.status(200).json(itemsDb.slice(0, 3));
    }
    // Has session -> display all products
    return res.status(200).json(itemsDb);
  }

  if (!session) {
    return res.status(401).json({ error: "Unauthorized. Please Sign in." });
  }

  if (req.method === 'POST') {
    const newItem = { id: String(Date.now()), ...req.body };
    itemsDb.push(newItem);
    return res.status(201).json(newItem);
  }

  if (req.method === 'PUT') {
    const { id } = req.body;
    const index = itemsDb.findIndex((item) => item.id === id);
    if (index === -1) return res.status(404).json({ error: "Product not found" });
    itemsDb[index] = { ...itemsDb[index], ...req.body };
    return res.status(200).json(itemsDb[index]);
  }

  if (req.method === 'DELETE') {
    const { id } = req.body;
    itemsDb = itemsDb.filter((item) => item.id !== id);
    return res.status(200).json({ message: "Deleted successfully" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
