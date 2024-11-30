import { createRoot } from "react-dom/client";
import { screen, waitFor } from '@testing-library/react';
import { act } from "react";
import DetalhesDaUnidade from '../DetalhesDaUnidade';
import { BrowserRouter } from "react-router-dom";

// Mock para a função fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      cnes: 123,
      name: 'Unidade de Saúde Teste',
      city: 'Cidade Teste',
      state: 'Estado Teste',
      kind: 'Tipo Teste',
      cep: '12345-678',
      cnpj: '12.345.678/0001-90',
      address: 'Rua Teste',
      number: '123',
      district: 'Bairro Teste',
      telephone: '1234-5678',
      latitude: -23.55052,
      longitude: -46.633308,
      email: 'teste@teste.com',
      shift: '24 horas',
      services: {
        'Serviço 1': ['Especialidade 1', 'Especialidade 2'],
        'Serviço 2': ['Especialidade 3']
      }
    }),
  })
) as jest.Mock;

jest.mock("../../constants", () => ({
    SERVER_HOST: "http://localhost:8000"
}));

jest.mock('../../Components/ToolBar', () => () => <div data-testid="toolbar">ToolBar</div>);
jest.mock('../../Components/MapComponent', () => () => <div data-testid="map-component">MapComponent</div>);
jest.mock('../../Components/InfoCard', () => ({ title, details, services }: { icon: React.ReactNode, title: string, details: string, services: Record<string, string[]> }) => (
  <div data-testid={`info-card-${title}`}>
    <div>{title}</div>
    <div>{details}</div>
    <div>{JSON.stringify(services)}</div>
  </div>
));

test('should render DetalhesDaUnidade with ToolBar and InfoCards', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
        createRoot(container).render(<BrowserRouter ><DetalhesDaUnidade /></BrowserRouter>);
    });

    await waitFor(() => {
        const toolbar = screen.getByTestId('toolbar');
        expect(toolbar).not.toBeNull();
    });

    const mapComponent = screen.getByTestId('map-component');
    expect(mapComponent).not.toBeNull();

    const addressCard = screen.getByText('Rua Teste, 123, Bairro Teste, 12345-678');
    expect(addressCard).not.toBeNull();

    const contactCard = screen.getByText('Número: 1234-5678 || Email: teste@teste.com');
    expect(contactCard).not.toBeNull();

    const shiftCard = screen.getByText('24 horas');
    expect(shiftCard).not.toBeNull();

    const servicesCard = screen.getByText('Lista de Especialidade');
    expect(servicesCard).not.toBeNull();
});