// @flow

import axios from '../api/axios'

export const getTrivia = () => {
  return axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
}
