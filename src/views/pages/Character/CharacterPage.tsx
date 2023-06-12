import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { characters } from "../../../api/characters";
import { ICharacter } from "../../../types/character.i";
import {
  Box,
  Container,
  Grid,
  CircularProgress,
  Typography,
  Divider,
  Chip,
} from "@mui/material";

export const CharacterPage = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState<ICharacter | null>(null);

  useEffect(() => {
    setLoading(true);
    characters
      .fetchCharacter({ id })
      .then((r) => {
        setCharacter(r.data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="xl">
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid sx={{ mt: 2 }} container columnSpacing={2}>
            <Grid item xs={6}>
              <Typography variant="h1">{character!.name}</Typography>
              <Divider />
              <Typography variant="h6">{character!.origin.name}</Typography>
              <Box sx={{ mt: 2 }}>
                <Chip
                  color="primary"
                  variant="outlined"
                  label={character!.status}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <img
                alt="character"
                src={character!.image}
                style={{ width: "100%", borderRadius: "0.5em" }}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};
