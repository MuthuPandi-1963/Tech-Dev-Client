import { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // Stop observing once the image is in view
        }
      },
      { threshold: 0.1 } // Trigger the load when 10% of the image is in view
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isIntersecting ? src : ""}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

export default LazyImage;
