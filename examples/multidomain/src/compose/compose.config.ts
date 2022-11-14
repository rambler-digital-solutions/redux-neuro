import { ILetter } from 'src/letters/interfaces/Letter.interface';
import { IState, ITriggers } from 'src/_redux/types';
import { createNeuron, createSlice } from '../../../../dist/lib';
import { TriggerPhaseWrapper } from '../../../../dist/lib/types';
import { changeItemReducer } from './reducers/changeItem.reducer';
import { closeWindowRecucer } from './reducers/closeWindow.reducer';
import { openWindowReducer } from './reducers/openWindow.reducer';
import { PreventCloseScript } from './scripts/PreventClose.script';
import { SetContentScript } from './scripts/SetContent.script';
import { SubmitLetterScript } from './scripts/SubmitLetter.script';

export interface IComposeState {
  openedComposeId: string | null;
  composeItems: Array<{
    id: string;
    subject: string;
  }>;
  body: string;
  subject: string;
  from: string;
  to: string;
}

const composeInitialState: IComposeState = {
  openedComposeId: null,
  composeItems: [],
  body: '',
  subject: '',
  from: '',
  to: '',
};

export interface IComposeTriggers {
  setContent: TriggerPhaseWrapper<{
    init: null;
    changeItem: { id: string; subject?: string };
    openFromList: { subject: string; body: string };
    openWindow: { id: string | null };
    closeWindow: { id: string; noCheck?: boolean };
    submit: { id: string };
    commitFormContent: null;
    syncForm: {
      text: string;
      input: 'subject' | 'body';
    };
    done: null;
  }>;
  submitLetter: TriggerPhaseWrapper<{
    init: null;
    save: null;
    done: null;
  }>;
  preventClose: TriggerPhaseWrapper<{
    init: null;
    set: { subject: string; body: string };
    clear: null;
    checkReq: { body: string; subject: string; passCb?: () => void };
    checkResp: boolean;
  }>;
  setFormState: Partial<IComposeState>;
}

const setContentBite = createNeuron<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'setContent'
>(
  {
    init: null,
    changeItem: changeItemReducer,
    openFromList: null,
    openWindow: openWindowReducer,
    closeWindow: closeWindowRecucer,
    commitFormContent: null,
    submit: closeWindowRecucer,
    syncForm: null, // вытащить из хранилища форму и положить ее в стор
    done: null,
  },
  {
    updateOn: ['setContent', 'preventClose'],
    canTrigger: ['setFormState', 'setContent', 'preventClose', 'openPopup'],
    script: SetContentScript,
    instance: 'stable',
    initOn: 'init',
  }
);

const submitLetterBite = createNeuron<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'submitLetter'
>(
  {
    init: null,
    save: null,
    done: null,
  },
  {
    updateOn: ['submitLetter'],
    canTrigger: [
      'saveLetter',
      'submitLetter',
      'setContent',
      'showNotification',
    ],
    script: SubmitLetterScript,
    instance: 'stable',
    initOn: 'init',
  }
);

const setFormStateBite = createNeuron<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'setFormState'
>((state, payload) => {
  Object.assign(state, payload);
}, null);

const preventCloseBite = createNeuron<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState,
  'preventClose'
>(
  {
    init: null,
    checkReq: null,
    checkResp: null,
    set: null,
    clear: null,
  },
  {
    updateOn: ['preventClose'],
    canTrigger: ['preventClose'],
    script: PreventCloseScript,
    instance: 'stable',
    initOn: 'init',
  }
);

export const composeSlice = createSlice<
  IComposeTriggers,
  ITriggers,
  IComposeState,
  IState
>(
  'compose',
  {
    setContent: setContentBite,
    submitLetter: submitLetterBite,
    setFormState: setFormStateBite,
    preventClose: preventCloseBite,
  },
  composeInitialState
);
