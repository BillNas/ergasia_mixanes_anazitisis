import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySearch = () => {
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [siteQuery, setSiteQuery] = useState('');

    const fetchData = async (category) => {
        if (category === 'estiatoria') {
            setSearchQuery('ελληνικά εστιατόρια στην ελλαδα');
            setSiteQuery('site:xrysoiskoufoi.gr OR site:tripadvisor.gr OR site:estiatoria.gr');
        } else if (category === 'kallyntika') {
            setSearchQuery('ανδρικά και γυναικεία καλλυντικά');
            setSiteQuery('site:hondos.gr OR site:myaroma.gr OR site:apivita.gr OR site:dustandcream.gr');
        }
    };

    useEffect(() => {
        const fetchDataWithQuery = async () => {
            try {
                const response = await axios.get(
                    'https://customsearch.googleapis.com/customsearch/v1',
                    {
                        params: {
                            key: 'AIzaSyAubVT5NnB3JNGrUaQM6T3IpcFO7KUG2cs',
                            cx: '9450661d53d944307',
                            q: searchQuery,
                            num: 5,
                        },
                    }
                );
                setResults(response.data.items);
            } catch (error) {
                console.error('Σφάλμα με την αναζήτηση...:', error);
            }
        };

        if (searchQuery) {
            fetchDataWithQuery();
        }
    }, [searchQuery]);

    return (
        <div className="container mx-auto px-2 md:px-4 lg:px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden shadow-md">
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-2">Εστιατόρια</h2>
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={() => fetchData('estiatoria')}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Αναζήτηση
                            </button>
                        </div>
                    </div>
                </div>
                <div className="rounded-lg overflow-hidden shadow-md">
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-2">
                            Γυναικεία και ανδρικά καλλυντικά
                        </h2>
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={() => fetchData('kallyntika')}
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Αναζήτηση
                            </button>
                        </div>
                    </div>
                </div>
                {results?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1">
                        {results?.map((result, index) => (
                            <div key={index} className="p-4 shadow-sm flex items-center">
                                <div>
                                    {result.title && typeof result.title === 'string' ? (
                                        <>
                                            <a
                                                href={result.link}
                                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                            >
                                                {result.title} - {result.displayLink}
                                            </a>
                                        </>
                                    ) : (
                                        <h2 className="font-bold text-lg">
                                            Μη διαθέσιμα αποτελέσματα
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
        </div>
    );
};

export default CategorySearch;
