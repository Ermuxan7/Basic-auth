const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:text-blue-600 cursor-pointer">Bosh sahifa</li>
            <li className="hover:text-blue-600 cursor-pointer">Statistika</li>
            <li className="hover:text-blue-600 cursor-pointer">
              Foydalanuvchilar
            </li>
            <li className="hover:text-blue-600 cursor-pointer">Sozlamalar</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-semibold mb-6">Asosiy Panel</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-medium">Foydalanuvchilar</h3>
            <p className="text-2xl font-bold mt-2">1200</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-medium">Buyurtmalar</h3>
            <p className="text-2xl font-bold mt-2">320</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-medium">Daromad</h3>
            <p className="text-2xl font-bold mt-2">$15,000</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
