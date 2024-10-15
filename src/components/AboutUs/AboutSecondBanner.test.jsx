import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutSecondBanner from '@/components/AboutUs/AboutSecondBanner';



// Mock next/image to avoid dealing with Next.js image optimization in tests
jest.mock('next/image', () => {
  return function Image({ src, alt }) {
    return <img src={src} alt={alt} />;
  };
});



// Mock the CommonText component
jest.mock('@/components/AboutUs/CommonText', () => {
  return function CommonText({ text, text2 }) {
    return (
      <>
        <p>{text}</p>
        {text2 && <p>{text2}</p>}
      </>
    );
  };
});



describe('AboutSecondBanner Component', () => {
  test('renders the top CommonText correctly', () => {
    render(<AboutSecondBanner />);

    // Check if the top CommonText renders the expected text
    const commonText = screen.getByText(
      /As we integrated and automated, built workflows/i
    );
    expect(commonText).toBeInTheDocument();
  });



  test('renders the top right images correctly', () => {
    render(<AboutSecondBanner />);

    // Use screen.getAllByAltText to get multiple elements with the same alt text
    const images = screen.getAllByAltText('banner image2');

    // Assert that the first and second images are present
    expect(images[0]).toBeInTheDocument(); // First image with alt="banner image2"
    expect(images[1]).toBeInTheDocument(); // Second image with alt="banner image2"
  });




  test('renders the third image correctly', () => {
    render(<AboutSecondBanner />);

    // Use screen.getByAltText for the unique image alt text
    const image3 = screen.getByAltText('banner image3');
    expect(image3).toBeInTheDocument();
  });



  test('renders the bottom right CommonText elements correctly', () => {
    render(<AboutSecondBanner />);

    // Check if the first bottom CommonText renders the correct text
    const commonText1 = screen.getByText(
      /June 10th, 2021 marked the start of a new era for babelforge.com/i
    );
    expect(commonText1).toBeInTheDocument();

    // Check if the second bottom CommonText renders the correct text
    const commonText2 = screen.getByText(
      /These days, we continue to fuel our growth/i
    );
    const additionalText = screen.getByText(/We’re only just getting started/i);

    expect(commonText2).toBeInTheDocument();
    expect(additionalText).toBeInTheDocument();
  });

  
});
