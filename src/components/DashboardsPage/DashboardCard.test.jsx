// DashboardCard.test.jsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardCard from './DashboardCard';
import Image from 'next/image';

// Mock the next/image component
jest.mock('next/image', () => {
  return ({ alt, src }) => <img alt={alt} src={src} />;
});

describe('DashboardCard Component', () => {
  const props = {
    row: "row-1",
    subtitle: "Card Subtitle",
    title: "Dashboard Card Title",
    description: "This is a description of the dashboard card.",
    image: "https://example.com/image.jpg",
  };

  test('renders DashboardCard with provided props', () => {
    render(<DashboardCard {...props} />);

    // Check if the subtitle is rendered
    expect(screen.getByText(/card subtitle/i)).toBeInTheDocument();

    // Check if the title is rendered
    expect(screen.getByText(/dashboard card title/i)).toBeInTheDocument();

    // Check if the description is rendered
    expect(screen.getByText(/this is a description of the dashboard card/i)).toBeInTheDocument();

    // Check if the image is rendered with the correct src and alt attributes
    const image = screen.getByAltText(/card 1/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.image);
  });

  test('renders without crashing', () => {
    const { container } = render(<DashboardCard {...props} />);
    expect(container).toBeInTheDocument();
  });
});
