import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


enum NotificationType {
  info = 0,
  error,
}

type NoteType = {
  notificationType: NotificationType,
  message: string
}

const initialState: NoteType = { notificationType: 0, message: '' }


export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setMessage: (state, action: PayloadAction<NoteType>) => {
      const message = action.payload;
      state.message = message.message;
      state.notificationType = message.notificationType;
    }
  },
})

export const { setMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
