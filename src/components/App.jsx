import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import LoadMoreBtn from './LoadMoreBtn';
import Loader from './Loader';

const perPage = 12;
const API_KEY = '37391031-3c842063259c869251b7769d0';
const BASE_URL = 'https://pixabay.com/api/';

export function App() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState('idle');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loadMore, setLoadMore] = useState(false);

  const fetchImages = async (searchQuery, page) => {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
    );
    const parseResponse = await response.json();
    return parseResponse;
  };

  useEffect(() => {
    const fetchData = async () => {
      setStatus('pending');
      try {
        const fetchResult = await fetchImages(searchQuery, page);
        setGalleryItems(prevResult => [...prevResult, ...fetchResult.hits]);
        setStatus('idle');
        setLoadMore(page < Math.ceil(fetchResult.totalHits / 12));
        if (fetchResult.hits.length === 0) {
          return toast.error(
            `Sorry, there are no images matching search query ${searchQuery}. Please try again.`
          );
        }
      } catch (error) {
        toast.error('Oops, something went wrong! Please, try again!');
      }
    };
    if (searchQuery !== '') {
      fetchData();
    }
  }, [page, searchQuery]);

  const incrementPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setGalleryItems([]);
    setPage(1);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {status === 'pending' && <Loader />}
      {galleryItems.length > 0 && <ImageGallery galleryItems={galleryItems} />}
      {loadMore && <LoadMoreBtn onClick={incrementPage} />}
    </>
  );
}
