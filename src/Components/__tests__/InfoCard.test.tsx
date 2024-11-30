import { createRoot } from "react-dom/client";
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from "react";
import InfoCard from '../InfoCard';

test('should render InfoCard and handle modal open', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const services = {
        'Serviço 1': ['Especialidade 1', 'Especialidade 2'],
        'Serviço 2': ['Especialidade 3']
    };

    await act(async () => {
        createRoot(container).render(
            <InfoCard
                icon={<div>Icon</div>}
                title="Lista de Especialidade"
                details="Some details"
                services={services}
            />
        );
    });

    const button = screen.getByText('Exibir Lista');
    expect(button).not.toBeNull();

    fireEvent.click(button);

    await waitFor(() => {
        const modal = screen.getByText('Especialidade 1');
        expect(modal).not.toBeNull();
    });
});