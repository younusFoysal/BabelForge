import AboutCulture from '@/components/AboutUs/AboutCulture';
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
            <AboutCulture></AboutCulture>
        </div>
    );
};

export default AboutUsPage;