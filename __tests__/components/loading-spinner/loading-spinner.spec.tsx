import React from 'react';
import { render } from '@testing-library/react';
import LoadingSpinner from '@/app/components/loading-spinner/loading-spinner';

describe('LoadingSpinner component', () => {
  it('renders loading spinner component with correct elements', () => {
    const { getByText, container } = render(<LoadingSpinner />);

    const loadingText = getByText('Loading...');
    expect(loadingText).toBeTruthy();

    const spinnerElement = container.querySelector('.loading');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('loading');
  });
});
