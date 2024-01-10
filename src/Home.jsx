import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container mx-auto px-4 pt-12">
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">Εργασία στο μάθημα Μηχανές Αναζήτησης</h1>
            <p className="text-xl text-gray-600 text-center mb-8">Επιλέξτε απο τα παρακάτω</p>
            <div className="flex justify-center space-x-4">
                <Link to="/search" href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Γενική αναζήτηση
                </Link>
                <Link to="/categorysearch" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Προσαρμοσμένη αναζήτηση
                </Link>
            </div>
            <div className="mt-8 text-2xl font-semibold text-center mb-4">
                <p className="mb-4">Ομάδα:</p>
                <ul className="list-disc list-inside space-y-2">
                    <li>Νασόπουλος Βασίλης</li>
                    <li>Κασούνης Παναγιώτης</li>
                </ul>
            </div>
        </div>
    );
}

export default Home;