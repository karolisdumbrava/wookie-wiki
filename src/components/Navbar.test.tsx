import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navbar } from './Navbar';

describe('Navbar', () => {

    const renderWithRouter = (ui: any, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route);
        return render(ui, { wrapper: Router });
    };

    test('renders Navbar correctly', () => {
        renderWithRouter(<Navbar />);
        expect(screen.getByText('Wookiee-Wiki')).toBeInTheDocument();
    });

    test('displays menu items when menu button is clicked', () => {
        renderWithRouter(<Navbar />);
        fireEvent.click(screen.getByText('Menu'));
        expect(screen.getByText('About')).toBeVisible();
        expect(screen.getByText('Films')).toBeVisible();
    });

    test('navigates to correct routes', () => {
        renderWithRouter(<Navbar />);
        fireEvent.click(screen.getByText('About'));
        expect(window.location.pathname).toBe('/about');
        fireEvent.click(screen.getByText('Films'));
        expect(window.location.pathname).toBe('/films');
    });
});
