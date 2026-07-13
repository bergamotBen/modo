import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";

export default function AddTask({ showModal, handleClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Task added");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Dialog open={showModal} onClose={handleClose}>
      <DialogTitle sx={{ color: "text.secondary", pb: 0.5 }}>
        ADD TASK
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0.5 }}>
          <TextField
            multiline
            rows={5}
            fullWidth
            autoFocus
            onKeyDown={handleKeyDown}
            aria-label="Task description"
          />
        </DialogContent>
        <DialogActions sx={{ pb: 2 }}>
          <Button type="submit">Add</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
