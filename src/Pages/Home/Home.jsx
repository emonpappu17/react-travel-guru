import Navbar from "../../Shared/Navbar";
import bgImg1 from '../../assets/Rectangle 1.png'
import bgImg2 from '../../assets/Sajek.png'
import bgImg3 from '../../assets/Sreemongol.png'
import bgImg4 from '../../assets/sundorbon.png'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    const handleNavigate = ()=>{
        navigate('/search')
    }

    return (
        <div className="bg-center bg-cover border min-h-screen w-screen bg-no-repeat lg:px-28 md:px-14 px-5" style={{
            backgroundImage: `url(${bgImg1})`
        }} >
            <Navbar></Navbar>
            <div className="flex justify-between items-center flex-col-reverse lg:flex-row mt-auto">
                <div className="text-white max-w-[500px] space-y-4">
                    <h2 className="text-7xl font-semibold">Coxs bazar</h2>
                    <p>Coxs Bazar is a city, fishing port, tourism centre and district headquarters in southeastern Bangladesh. It is famous mostly for its long natural sandy beach, and it ...</p>
                    <button className="btn border-none bg-yellow-600 text-black">Booking</button>
                </div>
                <div className="max-w-[230px] border rounded-3xl">
                    <Swiper
                        effect={'flip'}
                        grabCursor={true}
                        pagination={true}
                        navigation={true}
                        modules={[EffectFlip, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img onClick={handleNavigate} className="rounded-3xl size-full" src={bgImg2} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img onClick={handleNavigate} className="rounded-3xl" src={bgImg3} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img onClick={handleNavigate} className="rounded-3xl" src={bgImg4} />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>

    );
};

export default Home;