import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [numResults, setNumResults] = useState(5); // State for number of results
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'https://customsearch.googleapis.com/customsearch/v1',
                {
                    params: {
                        key: 'AIzaSyAubVT5NnB3JNGrUaQM6T3IpcFO7KUG2cs',
                        cx: '9450661d53d944307',
                        q: searchQuery,
                        num: numResults,
                    },
                },
            );
            setResults(response.data.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#ffffff]">
            <header className="px-4 lg:px-6 h-14 flex items-center"></header>
            <main className="flex flex-1 items-center justify-center">
                <div className="w-full max-w-2xl p-4">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold mb-4">
                            Εργασία στο μάθημα Μηχανές Αναζήτησης
                        </h1>
                        <h2 className="text-3xl font-bold mb-4">
                            {' '}
                            2o ΕΡΩΤΗΜΑ (Γενική μηχανή αναζήτησης)
                        </h2>
                    </div>
                    <div className="flex items-center space-x-2 mb-8">
                        <input
                            className="w-full rounded-md shadow-sm p-2"
                            placeholder="Αναζήτηση..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <select
                            value={numResults}
                            onChange={(e) => setNumResults(Number(e.target.value))}
                            className="rounded-md shadow-sm p-2"
                        >
                            <option value={5}>5 αποτελέσματα</option>
                            <option value={10}>10 αποτελέσματα</option>
                        </select>
                        <button
                            onClick={fetchData}
                            className="bg-blue-500 text-white hover:bg-blue-600 rounded-md p-2"
                            disabled={loading}
                        >
                            {loading ? 'Αναζήτηση...' : 'Αναζήτηση'}
                        </button>
                    </div>
                    {results.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-1">
                            {results?.map((result, index) => (
                                <div key={index} className="p-4 shadow-sm flex items-center">
                                    <div>
                                        {result.title && typeof result.title === 'string' ? (
                                            <a
                                                href={result.link}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                {result.title} - {result.displayLink}
                                            </a>
                                        ) : (
                                            <h2 className="font-bold text-lg">
                                                Μη διαθέσιμες πληροφορίες
                                            </h2>
                                        )}
                                        <p>{result.snippet}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Δεν βρέθηκαν αποτελέσματα</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Search;
