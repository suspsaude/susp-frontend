import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, Dialog,  DialogTitle, DialogContent, List, ListItem, ListItemText } from '@mui/material';

interface InfoCardProps {
  icon: React.ReactNode;  // Icon component
  title: string;          // Title of the card (e.g., "Contact")
  details: string;        // Information displayed (e.g., phone number)
  services: {
    [key: string]: string[]; // Representa os serviços como um objeto onde a chave é uma string e o valor é um array de strings
  };
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, details, services }) => {

  const [openModal, setOpenModal] = useState<boolean>(false);

  const openModalNow = async() => {
    setOpenModal(true);
  }

  const closeModal = async()=> {
    setOpenModal(false);
  }


  return (
    <Card sx={{ display: 'flex', alignItems: 'center', paddingX: 2, paddingTop: 1, boxShadow: 1, mb: 2, borderRadius: "10px"}}>
      
      <Box sx={{ mr: 2 }}>
        {icon} {/* Icon on the left */}
      </Box>

      <CardContent sx={{ padding: '8px 0px' }}>

        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <div>{title=="Lista de Especialidade"?<Button onClick={openModalNow}>Exibir Lista</Button>:details}</div>
        </Typography>

{/*         Modal para exibir a lista de unidades quando o usuário clicar no botão*/}
        <Dialog open={openModal} onClose={closeModal} maxWidth={'md'}>
          <DialogTitle>Lista de Especialidades</DialogTitle>
          <DialogContent>
            <List>
              {Object.entries(services).map(([category, serviceList], index) => (
                <React.Fragment key={index}>
                  <Typography variant="h6">{category}</Typography>
                  {serviceList.map((service, i) => (
                    <ListItem key={i}>
                      <ListItemText primary={service} />
                    </ListItem>
                  ))}
                </React.Fragment>
              ))}
            </List>
          </DialogContent>
        </Dialog>

      </CardContent>
    </Card>
  );
};

export default InfoCard;
