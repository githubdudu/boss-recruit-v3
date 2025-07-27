import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

// Import your reducers
import userInfoSlice from 'reducer/userInfoSlice';
import userListSlice from 'reducer/userListSlice';
import isLoggedInSlice from 'reducer/isLoggedInSlice';

import App from './App';

// Create a mock store helper
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      userInfo: userInfoSlice,
      userList: userListSlice,
      isLoggedIn: isLoggedInSlice
    },
    preloadedState: initialState
  });
};

describe('<App />', () => {
  it('should render the App', () => {
    const mockStore = createMockStore({
      userInfo: { targetUserType: 'recruiter' },
      userList: [],
      isLoggedIn: { value: true }
    });

    const { container } = render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );
    expect(screen.getByRole('heading', { name: /List/i })).toBeInTheDocument();
    expect(screen.getByText('Messages', { exact: true })).toBeInTheDocument();
    expect(screen.getByText('Me', { exact: true })).toBeInTheDocument();

    expect(container.firstChild).toBeInTheDocument();
  });

  it('should show SpinLoading when targetUserType is not set', () => {
    const mockStore = createMockStore({
      userInfo: { targetUserType: null }, // No targetUserType
      userList: [],
      isLoggedIn: { value: true }
    });

    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    // Look for the loading spinner
    expect(screen.getByTestId('spin-loading')).toBeInTheDocument();

    // Alternative: Look for the loading element by class or role
    // expect(document.querySelector('.adm-spin-loading')).toBeInTheDocument();
  });

  it('should show content when targetUserType is set', () => {
    const mockStore = createMockStore({
      userInfo: { targetUserType: 'recruiter' },
      userList: [],
      isLoggedIn: { value: true }
    });

    render(
      <Provider store={mockStore}>
        <App />
      </Provider>
    );

    // Should show the tab bar instead of loading
    expect(
      screen.getByRole('heading', { name: 'Recruiter List' })
    ).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
    expect(screen.getByText('Me')).toBeInTheDocument();
  });
});
