export default function AdminOrdersPage() {
  const mockOrders = [
    { id: "ORD-001", customer: "Abebe B.", items: "2x Macchiato, 1x Sambusa", total: 115, status: "pending", time: "2 mins ago" },
    { id: "ORD-002", customer: "Sara M.", items: "1x Honey Latte", total: 65, status: "completed", time: "15 mins ago" },
    { id: "ORD-003", customer: "Dawit T.", items: "2x Espresso, 2x Butter Croissant", total: 150, status: "completed", time: "1 hour ago" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-primary font-bold">Orders</h1>
          <p className="text-on-surface-variant mt-2">Manage incoming orders from the digital menu.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/20 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant text-sm border-b border-outline-variant/20">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Customer</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Time</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low/50 transition-colors">
                <td className="p-4 font-mono font-bold text-on-surface">{order.id}</td>
                <td className="p-4 text-on-surface font-medium">{order.customer}</td>
                <td className="p-4 text-on-surface-variant text-sm">{order.items}</td>
                <td className="p-4 text-primary font-bold">{order.total} Birr</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'pending' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                    {order.status === 'pending' ? 'Pending' : 'Completed'}
                  </span>
                </td>
                <td className="p-4 text-right text-on-surface-variant text-sm">{order.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
