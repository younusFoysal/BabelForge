// DetailsCard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsCard from '@/components/Dashboards/MainPage/DetailsCard';

describe('DetailsCard Component', () => {
  const mockStats = {
    totalTeamMembers: 10,
    totalTeams: 3,
    totalTasks: 20,
    pendingTasks: 5,
  };

  test('displays loading state correctly', () => {
    render(<DetailsCard stats={mockStats} isLoading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders stats correctly', () => {
    render(<DetailsCard stats={mockStats} isLoading={false} />);

    expect(screen.getByText('Total Members')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    expect(screen.getByText('Total teams')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    expect(screen.getByText('Total Tasks')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    expect(screen.getByText('Pending Tasks')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
