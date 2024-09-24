import AboutCulture from '@/components/AboutUs/AboutCulture';
import AboutFirstBanner from '@/components/AboutUs/AboutFirstBanner';
import AboutSecondBanner from '@/components/AboutUs/AboutSecondBanner';
import AboutStatistics from '@/components/AboutUs/AboutStatistics';
import JoinTeamCTA from '@/components/AboutUs/JoinTeamCTA';
import React from 'react';

const AboutUsPage = () => {
    return (
        <div>
            <AboutFirstBanner></AboutFirstBanner>
            <AboutSecondBanner></AboutSecondBanner>
            <AboutStatistics></AboutStatistics>
            <AboutCulture></AboutCulture>
            <JoinTeamCTA></JoinTeamCTA>
        </div>
    );
};

export default AboutUsPage;