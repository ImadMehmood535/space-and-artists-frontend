//Plan Reducer
const planReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PLAN': {
      // localStorage.setItem('plan', action.payload);
      return {
        plan: action.payload,
      };
    }

    case 'SET_CLIENT_ARTIST_PLAN': {
      return {
        clientArtistPlan: action.payload,
      };
    }

    default:
      return state;
  }
};

export default planReducer;
