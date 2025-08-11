// src/store/slices/userLuckyDrawSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Ticket  {
  draw: number[];
  drawPlayedAt: string;
}

interface UserLuckyDrawState {
  tickets: Ticket[];
  lastPlayedAt: string;
  purchasedTickets: Ticket[];
}

const initialState: UserLuckyDrawState = {
  tickets: [],
  lastPlayedAt: '',
  purchasedTickets: [],
};

const userLuckyDrawSlice = createSlice({
  name: 'userLuckyDraw',
  initialState,
  reducers: {
    addTickets(state, action: PayloadAction<number[]>) {
      const newTicket: Ticket = {
        draw: action.payload,
        drawPlayedAt: new Date().toISOString()
      };
      state.tickets.push(newTicket);
      state.lastPlayedAt = new Date().toISOString();
    },
    resetLuckyDraw(state) {
      state.tickets = [];
      state.lastPlayedAt = '';
    },
    purchaseTicket(state) {
      state.purchasedTickets = state.tickets;
      state.tickets = [];
      state.lastPlayedAt = '';
    },
    removeDrawByIndex: (state, action: PayloadAction<number>) => {
      state.tickets.splice(action.payload, 1);
    },
  },
});

export const { addTickets, resetLuckyDraw, removeDrawByIndex, purchaseTicket } = userLuckyDrawSlice.actions;
export default userLuckyDrawSlice.reducer;
