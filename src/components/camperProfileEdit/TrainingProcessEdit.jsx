import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import TikTokEmbedEdit from './TiktokEmbedEdit';
import styles from './styles/TrainingProcessEdit.module.css';
import 'swiper/css';
import 'swiper/css/pagination';

const TrainingProcessEdit = ({ videos }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.update();
    }
  }, [isMobile]);

  return (
    <section className={styles.process}>
      <h2 className={styles.profileSubtitle}>
        <span className={styles.highlight}>&lt;/</span> Mi proceso de Formación
      </h2>
      <div className={styles.videos}>
        {isMobile ? (
          <Swiper
            ref={swiperRef}
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className={`${styles.profileSwiper} ${styles.mobileSwiper}`}
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <TikTokEmbedEdit videoUrl={video.url} title={video.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className={styles.profileSwiper}
          >
            {videos.map((video, index) => (
              <SwiperSlide key={index} className={styles.videoItem}>
                <TikTokEmbedEdit videoUrl={video.url} title={video.title} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default TrainingProcessEdit;