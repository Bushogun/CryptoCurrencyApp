import React from 'react';
import { render } from '@testing-library/react';
import About from '@/app/about/page';

describe('About Component', () => {
  it('renders two images with correct attributes', () => {
    const { getByAltText } = render(<About />);
    
    const image1 = getByAltText('Jonathan Soto') as HTMLImageElement;
    const image2 = getByAltText('3D Model JS') as HTMLImageElement;

    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();

    const src1 = image1.src;
    const src2 = image2.src;

    expect(src1.includes('untitled.png')).toBeTruthy(); 
    expect(src2.includes('3dmodelJs2.png')).toBeTruthy(); 

    expect(image1).toHaveAttribute('width', '650');
    expect(image1).toHaveAttribute('height', '300');
    expect(image2).toHaveAttribute('width', '450');
    expect(image2).toHaveAttribute('height', '650');
  });
});
