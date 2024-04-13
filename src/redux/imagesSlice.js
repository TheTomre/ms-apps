// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Define the initial state
// const initialState = {
//   images: [],
//   category: 'all',
//   currentPage: 1,
//   loading: false,
//   error: null,
// };

// // Define async thunk for fetching images
// export const fetchImages = createAsyncThunk(
//   'images/fetchImages',
//   async (category, { getState }) => {
//     const { currentPage } = getState().images;
//     const response = await axios.get(`https://localhost:3001/${category}?page=${currentPage}`);
//     return response.data;
//   }
// );

// // Create the slice
// const imagesSlice = createSlice({
//   name: 'images',
//   initialState,
//   reducers: {
//     setCategory: (state, action) => {
//       state.category = action.payload;
//     },
//     updatePage: (state, action) => {
//       state.currentPage = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchImages.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchImages.fulfilled, (state, action) => {
//         state.loading = false;
//         state.images = action.payload;
//       })
//       .addCase(fetchImages.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// // Export actions and reducer
// export const { setCategory, updatePage } = imagesSlice.actions;
// export default imagesSlice.reducer;

// src/redux/imagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  images: [],
  category: 'nature',
  currentPage: 1,
  loading: false,
  error: null,
};

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async (_, { getState }) => {
    const { category, currentPage } = getState().images;
    const response = await axios.get(`http://localhost:3001/images/${category}?page=${currentPage}`);
    return response.data.hits;
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
      state.currentPage = 1; // Reset page when category changes
    },
    nextPage: (state) => {
      state.currentPage++;
    },
    prevPage: (state) => {
      state.currentPage = Math.max(1, state.currentPage - 1);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.loading = false;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const { setCategory, nextPage, prevPage } = imagesSlice.actions;
export default imagesSlice.reducer;

