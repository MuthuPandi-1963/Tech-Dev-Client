import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonFlex({ loading = false, data = [] }) {
  return (
    <div className="flex flex-wrap w-full">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Box
          key={index}
          sx={{
            width: 210,
            height: 300,
            marginRight: 0.5,
            my: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <Skeleton
              variant="rectangular"
              className="h-64 w-full"
              sx={{ height: 300, width: 210 }}
            />
          ) : (
            <img
              style={{ width: 210, height: 300 }}
              alt={item?.title || 'Image'}
              src={item?.src || ''}
            />
          )}
        </Box>
      ))}
    </div>
  );
}

SkeletonFlex.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
    })
  ),
};
