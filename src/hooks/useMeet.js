import { create } from "zustand";

const useMeet = create((set) => ({
  fullName: "",
  setFullName: (name) => set({ fullName: name }),
}));

export default useMeet;
