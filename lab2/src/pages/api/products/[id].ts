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
  const { id } = req.query;

  if (req.method === 'GET') {
    const product = itemsDb.find((item) => item.id === id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    return res.status(200).json(product);
  }

  if (!session) {
    return res.status(401).json({ error: "Unauthorized. Please Sign in." });
  }

  if (req.method === 'PUT') {
    const index = itemsDb.findIndex((item) => item.id === id);
    if (index === -1) return res.status(404).json({ error: "Product not found" });
    itemsDb[index] = { ...itemsDb[index], ...req.body };
    return res.status(200).json(itemsDb[index]);
  }

  if (req.method === 'DELETE') {
    itemsDb = itemsDb.filter((item) => item.id !== String(id));
    return res.status(200).json({ message: "Deleted successfully" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
