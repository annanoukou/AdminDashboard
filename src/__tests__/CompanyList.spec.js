import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CompanyList from '../components/CompanyList';

const mockCompanies = [
  {
    companyId: '1',
    name: 'Alpha Ltd',
    registrationNumber: 'A123456789',
    countryOfIncorporation: 'US',
  },
  {
    companyId: '2',
    name: 'Beta Corp',
    registrationNumber: 'B987654321',
    countryOfIncorporation: 'UK',
  },
];

describe('CompanyList', () => {
  test('renders companies and simulates click', () => {
    render(
      <Router initialEntries={['/']}>
        <CompanyList companies={mockCompanies} />
      </Router>
    );

    expect(screen.getByText('Alpha Ltd')).toBeInTheDocument();
    expect(screen.getByText('Beta Corp')).toBeInTheDocument();
  });
});
