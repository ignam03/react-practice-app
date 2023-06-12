import { instance } from "./base.api";

const endpoint = "character";

export const characters = {
  fetchAll: function ({ page = 1 }: { page?: number }) {
    return instance.get(endpoint, {
      params: { page },
    });
  },

  fetchCharacter: function ({ id }: { id: string | undefined }) {
    return instance.get(`${endpoint}/${id}`);
  },
};
