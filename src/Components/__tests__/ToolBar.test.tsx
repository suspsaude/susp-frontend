import { createRoot } from "react-dom/client";
import { screen } from '@testing-library/react';
import { act } from "react";
import { BrowserRouter } from 'react-router-dom';
import ToolBar from '../ToolBar';

test('should render the ToolBar with a button and icon', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
        createRoot(container).render(
            <BrowserRouter>
                <ToolBar />
            </BrowserRouter>
        );
    });

    const button = screen.getByText('Início');
    expect(button).not.toBeNull();

    const icon = container.querySelector('svg');
    expect(icon).not.toBeNull();
});