import { createRoot } from "react-dom/client";
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from "react";
import AutocompleteBar from '../AutocompleteBar';

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

test('should render AutocompleteBar and fetch specialties', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const mockOnSpecialtyChange = jest.fn();

    await act(async () => {
        createRoot(container).render(<AutocompleteBar onSpecialtyChange={mockOnSpecialtyChange} />);
    });
    
    const input = screen.getByLabelText('Especialidade');
    expect(input).not.toBeNull();

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/especialidades");

    const button = screen.getByLabelText('Open');
    expect(button).not.toBeNull();

    fireEvent.click(button);
    
    await waitFor(() => {
        expect(screen.getByText("CARDIOLOGIA")).not.toBeNull();
        expect(screen.getByText("OFTAMOLOGIA")).not.toBeNull();
        expect(screen.getByText("ODONTOLOGIA")).not.toBeNull();
    });
});