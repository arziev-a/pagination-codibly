import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({handleProductSelect, selectedProduct, handleModalClose,modalOpen}) {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Button onClick={handleProductSelect}>Open modal</Button> */}
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <h1 style={{color: selectedProduct.color}}>{selectedProduct.name}</h1>
            <p>ID: {selectedProduct.id}</p>
            <p>Year: {selectedProduct.year}</p>
            <p>Color: {selectedProduct.color}</p>
            <p>Pantone value: {selectedProduct.pantone_value}</p>
        </Box>
        {/* <Button>Close</Button> */}
      </Modal>
    </div>
  );
}