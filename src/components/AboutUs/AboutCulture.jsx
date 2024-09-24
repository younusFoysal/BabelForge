/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import React from 'react';
import icon1 from '@/image/About/trust.png'
import icon2 from '@/image/About/pendulum.png'
import icon3 from '@/image/About/speed.png'
import icon4 from '@/image/About/product.png'
import icon5 from '@/image/About/inclusive.png'
import icon6 from '@/image/About/heart.png'
import AboutCultureCard from './AboutCultureCard';

const aboutCardData = [
    {
        id: 1,
        image: icon1,
        headline: "Transparency and trust",
        hoverText: "Data is at the core of our identity both as a company and a team, and is an essential part of our platform. Access to data allows teams to work even better together and perform at their professional best. It's that kind of total freedom that builds trust and leads to fast execution and high impact."
    },


    {
        id: 2,
        image: icon2,
        headline: "Ownership and Impact",
        hoverText: "We have learned that our employees need to take full ownership over their work, from A to Z, which instills a sense of personal investment and drive leading to better overall execution and an understanding that ‘done’ is often better than perfect."
    },

    {
        id: 3,
        image: icon3,
        headline: "Speed and Execution",
        hoverText: "We believe the faster you execute, the faster you learn, iterate, and improve. We are constantly running at our own pace and seeking feedback, both internally and from customers, so we can outdo our best. We believe this eagerness to try and improve gives us a competitive edge, especially as we continue to scale."
    },

    {
        id: 4,
        image: icon4,
        headline: "Product-first",
        hoverText: "We mean it when we say that a product should work for the customer and not the other way around. Every feature is designed with ease of use in mind to deliver the best user experience. And proven by the fact that more than 70% of our customers work in traditionally non-tech industries."
    },

    {
        id: 5,
        image: icon5,
        headline: "Inclusivity",
        hoverText: "We have embedded inclusivity in the core of our company values and our platform experience, providing an experience open to everyone. We prioritize inclusion and diversity not only because it is right, but because we believe it creates better teams and ultimately a better product."
    },

    {
        id: 6,
        image: icon6,
        headline: "Customer-Centricity",
        hoverText: "Our customers’ satisfaction and success is at the heart of everything we do. We are passionately committed to helping customers with our best-in-class support, and we believe that when our customers win, we win."
    }
]
const AboutCulture = () => {
    return (
        <div className='mt-24 space-y-20'>
            <h3 className='text-center font-bold text-3xl md:text-4xl'>Our Culture and Values</h3>
            <div className='w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    aboutCardData.map(text => <AboutCultureCard key={text.id} image={text.image} headline={text.headline} hoverText={text.hoverText}></AboutCultureCard>)
                }
            </div>
        </div>
    );
};

export default AboutCulture;