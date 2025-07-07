import { Box, Typography } from "@mui/material";

export default function EmptyState() {
  return (
    <Box
      flex={1}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#FFF"
    >
      <Typography variant="h5" color="text.secondary">
        No notes yet. Click + to create your first note!
      </Typography>
    </Box>
  );
}
