import { createRoot } from "react-dom/client";
import { screen, waitFor } from '@testing-library/react';
import { act } from "react";
import HomePage from '../HomePage';

// Mock para a função fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: [1, 2], name: 'Cardiologia' }]),
  })
) as jest.Mock;

jest.mock("../../constants", () => ({
    SERVER_HOST: "http://localhost:8000"
}));

jest.mock('../../Components/ToolBar', () => () => <div data-testid="toolbar">ToolBar</div>);
jest.mock('../../Components/SearchForm', () => () => <div data-testid="search-form">SearchForm</div>);

test('should render HomePage with ToolBar and SearchForm', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
        createRoot(container).render(<HomePage />);
    });

    await waitFor(() => {
        const toolbar = screen.getByTestId('toolbar');
        expect(toolbar).not.toBeNull();
    });

    const searchForm = screen.getByTestId('search-form');
    expect(searchForm).not.toBeNull();

    const title = screen.getByText('Procure sua Unidade de Saúde');
    expect(title).not.toBeNull();

    const description = screen.getByText(/Digite uma especialidade e o seu CEP para/);
    expect(description).not.toBeNull();
});