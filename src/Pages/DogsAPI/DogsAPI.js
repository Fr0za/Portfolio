import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DogsAPI = () => {
  const [dogImage, setDogImage] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [subBreeds, setSubBreeds] = useState([]);
  const [selectedSubBreed, setSelectedSubBreed] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://dog.ceo/api/breeds/list/all')
      .then((response) => {
        setBreeds(Object.keys(response.data.message));
      })
      .catch((error) => {
        console.error('Failed to fetch breeds', error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedBreed) {
      setLoading(true);
      axios
        .get(`https://dog.ceo/api/breed/${selectedBreed}/list`)
        .then((response) => {
          setSubBreeds(response.data.message);
        })
        .catch((error) => {
          console.error('Failed to fetch sub-breeds', error);
        })
        .finally(() => setLoading(false));
    }
  }, [selectedBreed]);

  const fetchDogImage = (url) => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        setDogImage(response.data.message);
      })
      .catch((error) => {
        console.error('Failed to fetch dog image', error);
      })
      .finally(() => setLoading(false));
  };

  const getRandomDogImage = () => {
    fetchDogImage('https://dog.ceo/api/breeds/image/random');
  };

  const getBreedDogImage = () => {
    if (selectedBreed) {
      fetchDogImage(`https://dog.ceo/api/breed/${selectedBreed}/images/random`);
    }
  };

  const getSubBreedDogImage = () => {
    if (selectedBreed && selectedSubBreed) {
      fetchDogImage(`https://dog.ceo/api/breed/${selectedBreed}/${selectedSubBreed}/images/random`);
    }
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Dogs API</h2>
        <p className="text-xl mb-4">The internet's biggest collection of open source dog pictures.</p>
        <div className="flex mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600"
            onClick={getRandomDogImage}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Get Random Dog Picture'}
          </button>
          <select
            className="border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600"
            value={selectedBreed}
            onChange={(e) => {
              setSelectedBreed(e.target.value);
              setSelectedSubBreed('');
            }}
            disabled={loading}
          >
            <option value="">Select Breed</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          {selectedBreed && (
            <>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-600"
                onClick={getBreedDogImage}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Get Dog Picture by Breed'}
              </button>
              {subBreeds.length > 0 && (
                <select
                  className="border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600 ml-4"
                  value={selectedSubBreed}
                  onChange={(e) => setSelectedSubBreed(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select SubBreed</option>
                  {subBreeds.map((subBreed) => (
                    <option key={subBreed} value={subBreed}>
                      {subBreed}
                    </option>
                  ))}
                </select>
              )}
              {selectedSubBreed && (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4 hover:bg-blue-600"
                  onClick={getSubBreedDogImage}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Get Dog Picture by SubBreed'}
                </button>
              )}
            </>
          )}
        </div>
        {dogImage && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="bg-white rounded shadow p-4">
              <img src={dogImage} alt="Dog" className="w-full h-auto rounded-md" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogsAPI;
