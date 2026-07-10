import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PortfolioState {
  settings: Record<string, unknown> | null;
  isLoading: boolean;
  selectedProject: string | null;
  projectFilter: string;
}

const initialState: PortfolioState = {
  settings: null,
  isLoading: true,
  selectedProject: null,
  projectFilter: "all",
};

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.settings = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedProject: (state, action: PayloadAction<string | null>) => {
      state.selectedProject = action.payload;
    },
    setProjectFilter: (state, action: PayloadAction<string>) => {
      state.projectFilter = action.payload;
    },
  },
});

export const {
  setSettings,
  setLoading,
  setSelectedProject,
  setProjectFilter,
} = portfolioSlice.actions;
export default portfolioSlice.reducer;
