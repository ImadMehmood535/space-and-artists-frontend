import React, { useReducer } from 'react';
import planContext from './planContext';
import PlanReducer from './planReducer';

const PlanState = (props) => {
  const initialState = {
    plan: '',
  };

  const [state, dispatch] = useReducer(PlanReducer, initialState);

  const setPlan = ({ plan }) => {
    dispatch({
      type: 'SET_PLAN',
      payload: plan,
    });
  };

  const setClientArtistPlan = ({ clientArtistPlan }) => {
    dispatch({
      type: 'SET_CLIENT_ARTIST_PLAN',
      payload: clientArtistPlan,
    });
  };

  return (
    <planContext.Provider
      value={{
        plan: state.plan,
        clientArtistPlan: state.clientArtistPlan,
        setPlan,
        setClientArtistPlan,
      }}>
      {props.children}
    </planContext.Provider>
  );
};

export default PlanState;
