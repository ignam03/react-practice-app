import {
  Grid,
  Container,
  Box,
  CircularProgress,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { CardComponent, Header } from "../../../components";
import { characters } from "./../../../api/characters";
import { TypeCharacter } from "../../../types/character";

export const HomePage: React.FC<{}> = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter ] = useState("");
  const [numberPage, setNumberPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [allCharacters, setAllCharacters] = useState<TypeCharacter[] | null>(
    null
  );

  useEffect(() => {
    setLoading(true);
    characters
      .fetchAll({ page })
      .then((r) => {
        setNumberPage(r.data.info.pages);
        setAllCharacters(r.data.results);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeFilter = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
    console.log(event.target.value);
  }

  return (
    <Container maxWidth="xl">
      <Header
        title="Rick & Morty "
        description="welcome application react openix"
        element={
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="filter"
            onChange={handleChangeFilter}
          >
            <MenuItem value={"character"}>Characters</MenuItem>
            <MenuItem value={"location"}>Locations</MenuItem>
            <MenuItem value={"episode"}>Episodes</MenuItem>
          </Select>
        </FormControl>
        }
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <div>
            {allCharacters?.length !== 0 ? (
              <Grid sx={{ my: 2 }} container spacing={2} direction="row">
                {allCharacters?.map((character) => (
                  <Grid key={character.id} item xs={3}>
                    <CardComponent
                      image={character.image}
                      name={character.name}
                      species={character.species}
                      status={character.status}
                      gender={character.gender}
                      id={character.id}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <div>Does not exist data</div>
            )}
          </div>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Pagination
              variant="outlined"
              color="primary"
              count={numberPage}
              page={page}
              onChange={handleChange}
              sx={{ mb: 3 }}
              size="large"
            />
          </Box>
        </>
      )}
    </Container>
  );
};
