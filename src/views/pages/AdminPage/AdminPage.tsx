import { Box, Divider, Container, Grid } from "@mui/material";
import { Typography } from "@mui/material";

const AdminPage = () => {
  return (
    <Box>
      <Container maxWidth="xl" sx={{ mt: 9 }}>
        <Grid>
          <Grid item>
            <Typography variant="h3" textAlign="center" sx={{ mb: 5 }}>
              Admin Post and Users
              <Divider />
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminPage;
