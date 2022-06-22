import { useRef, useState } from 'react';
import Slider from 'react-slick';
// @mui
import { Card } from '@mui/material';
// components
import { LightboxModal, CarouselArrowIndex, Image } from '../../components';

// ----------------------------------------------------------------------

interface IProfileGalleryProps {
  gallery: string[];
}

export const ProfileGallery: React.FC<IProfileGalleryProps> = ({ gallery }) => {
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slider = useRef<Slider | null>(null);

  const settings = {
    dots: false,
    arrows: false,
    slidesToShow: 1,
    draggable: false,
    slidesToScroll: 1,
    adaptiveHeight: true,
    beforeChange: (current: number, next: number) => setCurrentIndex(next),
  };

  const handleOpenLightbox = (url: string) => {
    const selectedImage = gallery.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const handlePrevious = () => {
    slider.current?.slickPrev();
  };

  const handleNext = () => {
    slider.current?.slickNext();
  };

  return (
    <>
      <Card>
        <Slider {...settings} ref={slider}>
          {gallery.map((image, index) => (
            <Image key={index}
              alt="image"
              src={image}
              sx={{ height: { xs: 280, xl: 320 }, cursor: 'zoom-in' }}
              onClick={() => handleOpenLightbox(image)}
            />
          ))}
        </Slider>
        <CarouselArrowIndex
          index={currentIndex}
          total={gallery.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      </Card>
      <LightboxModal
        images={gallery}
        mainSrc={gallery[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    </>
  );
}

