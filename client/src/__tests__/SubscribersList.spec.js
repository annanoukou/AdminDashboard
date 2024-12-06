import { render, screen } from '@testing-library/react';
import SubscribersList from '../components/SubscribersList';
import { DataProvider } from '../context/DataContext';  // Assuming context provider

test('renders no subscribers message when list is empty', () => {
  render(
    <DataProvider>
      <SubscribersList />
    </DataProvider>
  );
  
  expect(screen.getByText('No subscribers found.')).toBeInTheDocument();
});

test('renders subscribers when available', () => {
  const subscribers = [{ email_address: 'test@example.com', status: 'subscribed' }];
  render(
    <DataProvider value={{ subscribers }}>
      <SubscribersList />
    </DataProvider>
  );
  
  expect(screen.getByText('test@example.com')).toBeInTheDocument();
});
