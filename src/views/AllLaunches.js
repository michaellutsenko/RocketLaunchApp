// The "all launches" tab
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LaunchList from '../components/LaunchList';
import { getNextPage } from '../store/actions';

const AllLaunches = () => {
  const launches = useSelector((state) => state.launches);
  const dispatch = useDispatch();

  return (
    <>
      <LaunchList
        items={launches}
        emptyMessage="Sorry Mario, your launch is in a different castle"
        onEndReached={() => dispatch(getNextPage())}
      />
    </>
  );
};

export default AllLaunches;
