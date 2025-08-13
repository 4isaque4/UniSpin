import * as repo from "../repositories/videos.repo.js";

export const list = () => repo.list();
export const get  = (id) => repo.get(id);
