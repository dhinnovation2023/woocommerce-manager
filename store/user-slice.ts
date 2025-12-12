import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Session } from 'next-auth';

const initialState: { session: Session | null } = { session: null }

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        initialize(state, action: PayloadAction<Session>) {
            state.session = action.payload;
        },
    },
});

export const { initialize } = userSlice.actions;
export default userSlice.reducer;
