 import { Button, Typography, Box, Snackbar, Alert } from '@mui/material';
 import { useState } from 'react';

const CopyTestLink = ({ testCode }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const testLink = `${window.location.origin}/test/${testCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(testLink);
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Test Link
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
          {testLink}
        </Typography>
        <Button
          variant="contained"
          size="small"
          // startIcon={<ContentCopyIcon />}
          onClick={handleCopy}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Copy Link
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setOpenSnackbar(false)}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CopyTestLink;