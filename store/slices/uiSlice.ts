import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  activeSection: string;
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
}

const initialState: UIState = {
  activeSection: "home",
  isMobileMenuOpen: false,
  isScrolled: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<string>) => {
      state.activeSection = action.payload;
    },
    setMobileMenuOpen: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenuOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    setScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
  },
});

export const {
  setActiveSection,
  setMobileMenuOpen,
  toggleMobileMenu,
  setScrolled,
} = uiSlice.actions;
export default uiSlice.reducer;
