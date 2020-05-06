import api from "../../utility/api";
import * as actionTypes from "../actions";
const initialState = {
  leftTeam: [],
  rightTeam: [],
  scoreLeftTeam: 0,
  scoreRightTeamL: 0,
  winnerScore: 0,
};

function calculateTotalScore(listTeam) {
  let score = 0;
  listTeam.map((item) => {
    score += item.score;
  });
  return score;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_TEAM: {
      console.log("SET_TEAM");
      let totalScoreLeftTeam = calculateTotalScore(action.leftList);
      let totalScoreRightTeam = calculateTotalScore(action.rightList);

      return {
        ...state,
        leftTeam: action.leftList,
        rightTeam: action.rightList,
        scoreLeftTeam: totalScoreLeftTeam,
        scoreRightTeamL: totalScoreRightTeam,
      };
    }

    case actionTypes.ADD_TEAM: {
      console.log("ADD_TEAM");
      const { leftTeam, rightTeam } = state;
      if (action.team == "left") {
        return {
          ...state,
          leftTeam: [...leftTeam, action.user],
          scoreLeftTeam: action.score + state.scoreLeftTeam,
        };
      } else {
        return {
          ...state,
          rightTeam: [...rightTeam, action.user],
          scoreRightTeamL: action.score + state.scoreRightTeamL,
        };
      }
    }

    case actionTypes.REMOVE_USER: {
      console.log("REMOVE_USER");

      const { leftTeam, rightTeam } = state;
      if (action.team == "left") {
        let temporayDynamicLeftTeam = leftTeam;
        let removeIndex = null;
        leftTeam.map((item, index) => {
          if (item.gitData.login === action.name) {
            removeIndex = index;
          }
        });

        temporayDynamicLeftTeam.splice(removeIndex, 1);
        return {
          ...state,
          leftTeam: temporayDynamicLeftTeam.concat(),
          scoreLeftTeam: 100,
        };
      } else {
      }
    }

    default:
      return state;
  }
};

export default reducer;
