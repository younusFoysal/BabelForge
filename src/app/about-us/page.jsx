import AboutFirstBanner from '@/components/AboutUs/AboutFirstBanner';
import AboutSecondBanner from '@/components/AboutUs/AboutSecondBanner';
import AboutStatistics from '@/components/AboutUs/AboutStatistics';
import React from 'react';

const AboutUsPage = () => {
    return (
        <div>
            <AboutFirstBanner></AboutFirstBanner>
            <AboutSecondBanner></AboutSecondBanner>
            <AboutStatistics></AboutStatistics>
        </div>
    );
};

export default AboutUsPage;