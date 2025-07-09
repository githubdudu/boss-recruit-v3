import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'app/store';

import App from './App';

describe('<App />', () => {
  it('should render the App', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(
      screen.getByRole('heading', {
        name: /Welcome/i,
        level: 1
      })
    ).toBeInTheDocument();

    expect(container.firstChild).toBeInTheDocument();
  });
});
