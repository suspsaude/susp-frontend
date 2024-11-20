import { createRoot } from "react-dom/client";
import { screen, fireEvent } from '@testing-library/react';
import { act } from "react";
import { BrowserRouter } from 'react-router-dom';
import SearchForm from '../SearchForm';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
        {
          "id": [
            1,
            2
          ],
          "name": "CARDIOLOGIA"
        },
        {
          "id": [
            2,
            3
          ],
          "name": "OFTAMOLOGIA"
        },
        {
          "id": [
            3,
            4
          ],
          "name": "ODONTOLOGIA"
        }]),
  })
) as jest.Mock;

jest.mock("../../constants", () => ({
    SERVER_HOST: "http://localhost:8000"
}));

test('should render SearchForm with AutocompleteBar and TextField', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
        createRoot(container).render(
            <BrowserRouter>
                <SearchForm />
            </BrowserRouter>
        );
    });

    const autocompletebar = screen.getByLabelText('Especialidade');
    expect(autocompletebar).not.toBeNull();

    const zipCodeInput = screen.getByLabelText('CEP');
    expect(zipCodeInput).not.toBeNull();
    fireEvent.change(zipCodeInput, { target: { value: '12345-678' } });
    expect((zipCodeInput as HTMLInputElement).value).toBe('12345-678');

    const button = screen.getByLabelText('Open');
    fireEvent.click(button);
    fireEvent.change(autocompletebar, { target: { value: 'CARDIOLOGIA' } });
    expect((autocompletebar as HTMLInputElement).value).toBe('CARDIOLOGIA');

    const searchButton = screen.getByText('Pesquisar');
    expect(searchButton).not.toBeNull();
});