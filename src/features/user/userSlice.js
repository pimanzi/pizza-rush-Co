import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';
function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAdress = createAsyncThunk(
  'user/fetchAdress',
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  }
);
const initialState = {
  user: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    update(state, action) {
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAdress.fulfilled, (state, action) => {
        state.status = 'idle';
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAdress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'Failed to get your current position. Make sure to fill this field';
      });
  },
});

export const { update } = userSlice.actions;
export default userSlice.reducer;
