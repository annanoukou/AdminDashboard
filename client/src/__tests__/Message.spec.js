import { render, screen } from '@testing-library/react';
import Message from '../components/Message';

test('renders success message', () => {
  render(<Message message="Success!" messageType="success" />);
  
  expect(screen.getByText('Success!')).toBeInTheDocument();
  expect(screen.getByText('Success!')).toHaveClass('text-green-600');
});

test('renders error message', () => {
  render(<Message message="Error occurred" messageType="error" />);
  
  expect(screen.getByText('Error occurred')).toBeInTheDocument();
  expect(screen.getByText('Error occurred')).toHaveClass('text-red-600');
});
