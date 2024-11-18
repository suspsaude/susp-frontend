import { createRoot } from "react-dom/client"
import SearchButton from "../SearchButton";
import { screen } from '@testing-library/react';
import { act } from "react";

test('should render the SearchButton with an actual callback', async () => { 
    const container = document.createElement('div');
    document.body.appendChild(container);
    
    const mockfn = jest.fn();

    await act(async () => {
        createRoot(container).render(<SearchButton isSearchButtonEnabled onClick={mockfn} />);
    });
    
    const button = screen.getByText('Pesquisar');
    expect(button).not.toBeNull();
    
    await act(async () => {
        button.click();
    });

    expect(mockfn).toHaveBeenCalled();
 })