import { render, screen, fireEvent } from '@testing-library/react';
import SubscriberItem from '../components/SubscriberItem';

test('renders email address and remove button', () => {
  const subscriber = { email_address: 'test@example.com' };
  const onRemove = jest.fn();
  
  render(<SubscriberItem subscriber={subscriber} onRemove={onRemove} />);
  
  expect(screen.getByText('test@example.com')).toBeInTheDocument();
  expect(screen.getByText('Remove')).toBeInTheDocument();
});

test('calls onRemove when remove button is clicked', () => {
  const subscriber = { email_address: 'test@example.com' };
  const onRemove = jest.fn();
  
  render(<SubscriberItem subscriber={subscriber} onRemove={onRemove} />);
  
  fireEvent.click(screen.getByText('Remove'));
  
  expect(onRemove).toHaveBeenCalledTimes(1);
});
