import { ILetter } from '../interfaces/Letter.interface';
import { ILettersState } from '../letters.config';

export const saveLetterReducer = (
  state: ILettersState,
  payload: { id: number }
) => {
  const newLetter = state.saveLetter.input;
  newLetter.uid = payload.id;
  state.lettersList.data.push(newLetter);
};
