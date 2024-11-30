import { createRoot } from "react-dom/client";
import { screen } from '@testing-library/react';
import { act } from "react";
import ListaDeUnidades from '../ListaDeUnidades';
import { MemoryRouter, Routes, Route } from "react-router-dom";

const facilitiesMock = [
    { type: 'Hospital', name: 'UBS 1', address: 'Address 1', distance: 1.2, cness: 123 },
    { type: 'Clinic', name: 'UBS 2', address: 'Address 2', distance: 3.5, cness: 456 },
];

// Mock fetch response
global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(facilitiesMock),
    })
  ) as jest.Mock;

jest.mock("../../constants", () => ({
    SERVER_HOST: "http://localhost:8000"
}));

jest.mock('../../Components/ToolBar', () => () => <div data-testid="toolbar">ToolBar</div>);
jest.mock('../../Components/UBSCard', () => () => <div data-testid="ubs-card">UBSCard</div>);

describe('ListaDeUnidades Component', () => {
    let container: HTMLDivElement;
    

    beforeEach(async () => {
        container = document.createElement('div');
        document.body.appendChild(container);

         // ListadeUnidades uses a function called useLocation.
        // A location contains information about the URL path, as well as possibly some arbitrary state and a key.
        // To test this we have to mock a state with a zipcode and specialty Id.
        await act(async () => {
            createRoot(container).render(
                <MemoryRouter initialEntries={[{
                        pathname: "/unidades",
                        state: { zipCode: "12345-678", specialtyId: 123 },
                    }]}>
                    <Routes>
                        <Route path="/unidades" element={<ListaDeUnidades />} />
                    </Routes>
                </MemoryRouter>
            );
        });
    });

    afterEach(() => {
        document.body.removeChild(container);
        container = null!;
        jest.clearAllMocks();
    });

    test('should render ToolBar component and the title "Escolha uma unidade', async () => {
        const toolbar = await screen.findByTestId('toolbar');
        expect(toolbar).not.toBeNull();
        const title = await screen.findByText('Escolha uma unidade');
        expect(title).not.toBeNull();
    });

    test('should render the UBS cards', async () => {
        const ubscards = await screen.findAllByTestId('ubs-card');
        expect(ubscards).toHaveLength(facilitiesMock.length);
    });

    test('displays pagination controls', () => {
        expect(screen.getByRole('navigation')).not.toBeNull();
        expect(screen.getByRole('button', { name: /next/i })).not.toBeNull();
    });


});
