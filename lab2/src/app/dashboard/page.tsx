export default function DashboardPage() {
  return (
    <div style={{ padding: '25px' }}>
      <h1>App Router Dashboard</h1>
      <p>This page uses the App Router with Mongoose integration.</p>
      <p>
        API Endpoints:
      </p>
      <ul>
        <li><code>GET /api/dbproducts</code> - Fetch all products from MongoDB</li>
        <li><code>POST /api/dbproducts</code> - Create a new product in MongoDB</li>
        <li><code>GET /api/dbproducts/[id]</code> - Fetch a single product by ID</li>
      </ul>
    </div>
  );
}
