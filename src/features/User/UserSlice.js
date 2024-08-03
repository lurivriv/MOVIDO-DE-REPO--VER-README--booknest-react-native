import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: {
      user: null,
      token: null,
      localId: null,
      imageCameraProfile: ""
    }
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.value.user = payload.email,
      state.value.token = payload.idToken,
      state.value.localId = payload.localId
    },
    clearUser: (state) => {
      state.value.user = null,
      state.value.token = null
    },
    setCameraImageProfile: (state, { payload }) => {
      state.value.imageCameraProfile = payload
    }
  }
})

export const { setUser, clearUser, setCameraImageProfile } = authSlice.actions

export default authSlice.reducer