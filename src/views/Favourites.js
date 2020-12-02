// The favourites tab
import React from 'react';
import { useSelector } from 'react-redux';
import LaunchList from '../components/LaunchList';

const Favourites = () => {
  const favourites = useSelector((state) => state.favourites);
  const search = useSelector((state) => state.search);

  // Note that I don't add the onEndReached function to the list here
  // because in favourites we won't need it as we are saving them
  // locally and all of them will always be rendered here
  return (
    <>
      <LaunchList
        items={
          search
            ? favourites.filter((launch) =>
                launch.name.toLowerCase().includes(search.toLowerCase()),
              )
            : favourites
        }
        emptyMessage={
          search
            ? "You don't have any favourite launches that match the search query"
            : "It seems, you have no favourites. What, don't you like space?"
        }
      />
    </>
  );
};

export default Favourites;
