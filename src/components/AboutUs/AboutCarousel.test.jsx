
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutCarousel from '@/components/AboutUs/AboutCarousel';


// Mock the react-slick library
jest.mock('react-slick', () => {
  return jest.fn(({ children }) => <div>{children}</div>);
});

describe('AboutCarousel Component', () => {
  beforeEach(() => {
    render(<AboutCarousel />);
  });

  test('renders the title', () => {
    const title = screen.getByText(/What would you like to manage?/i);
    expect(title).toBeInTheDocument();
  });

  test('renders the carousel items', () => {
    const carouselItem1 = screen.getByText(/Community Events/i);
    const carouselItem2 = screen.getByText(/We are onto something/i);
    const carouselItem3 = screen.getByText(/Our first customers!/i);

    expect(carouselItem1).toBeInTheDocument();
    expect(carouselItem2).toBeInTheDocument();
    expect(carouselItem3).toBeInTheDocument();
  });

 
});
