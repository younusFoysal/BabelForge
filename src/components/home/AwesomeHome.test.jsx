// __tests__/AwesomeHome.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AwesomeHome from '@/components/home/AwesomeHome';
import HeroLeft from '@/components/home/HeroNew/HeroLeft';

jest.mock('../../components/home/HeroNew/HeroLeft', () => {
  const HeroLeft = () => <div>HeroLeft Component</div>;
  HeroLeft.displayName = 'HeroLeft';
  return HeroLeft;
});

describe('AwesomeHome Component', () => {
  it('renders the AwesomeHome component correctly', () => {
    render(<AwesomeHome />);

    const imgElement = screen.getByAltText('Dashboard Demo Image');
    expect(imgElement).toBeInTheDocument();

    const encodedPath = encodeURIComponent('/images/light-dash.png');
    expect(imgElement.getAttribute('src')).toContain(`url=${encodedPath}`);

    expect(screen.getByText('HeroLeft Component')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<AwesomeHome />);
    expect(asFragment()).toMatchSnapshot();
  });
});
