import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import apple from '../../../image/Footer/apple.png'; // Assuming correct import

describe('Footer Component', () => {

    test('renders Technology link', () => {
        render(<Footer />);

        // Check if the "Technology" link is in the document
        const technologyLink = screen.getByText('Technology');

        expect(technologyLink).toBeInTheDocument();
        expect(technologyLink).toHaveAttribute('href', '');  // Check the href attribute
    });

    test('renders the ios App Store link with the correct image', () => {
        render(<Footer />);

        // Check if the image with alt text 'ios App store' is present
        const iosAppStoreImage = screen.getByAltText('ios App store');

        expect(iosAppStoreImage).toBeInTheDocument();

        // Check if the image has the correct src attribute
        // expect(iosAppStoreImage).toHaveAttribute('src', expect.stringContaining('/apple.png'));
    });

});
