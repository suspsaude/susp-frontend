import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from '@mui/material';
import ServiceModal from './ServiceModal'; // Importa o modal separado

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  details: string;
  services: {
    [key: string]: string[];
  };
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, details, services }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const openModalNow = async () => {
    setOpenModal(true);
  };

  const closeModal = async () => {
    setOpenModal(false);
  };

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingX: 2,
        paddingTop: 1,
        boxShadow: 1,
        mb: 2,
        borderRadius: '10px',
      }}
    >
      <Box sx={{ mr: 2 }}>{icon}</Box>

      <CardContent sx={{ padding: '8px 0px' }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <div>
            {title === 'Lista de Especialidade' ? (
              <Button onClick={openModalNow}>Exibir Lista</Button>
            ) : (
              details
            )}
          </div>
        </Typography>
      </CardContent>

      {/* Usar o modal modularizado */}
      <ServiceModal open={openModal} onClose={closeModal} services={services} />
    </Card>
  );
};

export default InfoCard;
