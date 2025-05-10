import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

// Mock des composants pour isoler les tests
jest.mock('../pages/MeetingHome', () => () => <div data-testid="meeting-home">Meeting Home</div>);
jest.mock('../pages/MeetingRoom', () => () => <div data-testid="meeting-room">Meeting Room</div>);

describe('Meeting Routes', () => {
  test('navigates to meeting home page', () => {
    render(
      <MemoryRouter initialEntries={['/meetings']}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('meeting-home')).toBeInTheDocument();
  });
  
  test('navigates to meeting room with ID', () => {
    const meetingId = 'abc123';
    render(
      <MemoryRouter initialEntries={[`/meeting/${meetingId}`]}>
        <App />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('meeting-room')).toBeInTheDocument();
  });
});