import AboutCarousel from '@/components/AboutUs/AboutCarousel';
import AboutCulture from '@/components/AboutUs/AboutCulture';
import AboutFirstBanner from '@/components/AboutUs/AboutFirstBanner';
import AboutSecondBanner from '@/components/AboutUs/AboutSecondBanner';
import AboutStatistics from '@/components/home/AboutStatistics';
import JoinTeamCTA from '@/components/AboutUs/JoinTeamCTA';
import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="mt-[120px]">
      <AboutFirstBanner></AboutFirstBanner>
      <AboutSecondBanner></AboutSecondBanner>
      <AboutCarousel></AboutCarousel>
      <AboutStatistics></AboutStatistics>
      <AboutCulture></AboutCulture>
      <JoinTeamCTA></JoinTeamCTA>
    </div>
  );
};

export default AboutUsPage;
