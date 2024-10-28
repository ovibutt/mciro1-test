import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Weather Dashboard</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Current
              </Link>
            </li>
            <li>
              <Link to="/forecast" className="hover:underline">
                Forecast
              </Link>
            </li>
            <li>
              <Link to="/historical" className="hover:underline">
                Historical
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
