import { ReactElement } from 'react';
import { IState, ITriggers } from 'src/_redux/types';
import { createNeuron, createSlice } from '../../../../dist/lib';
import { TriggerPhaseWrapper } from '../../../../dist/lib/types';
import { OpenPopupScript } from './scripts/OpenPopup.script';

export interface IPopupState {
  isOpen: boolean;
  content: string | ReactElement;
}

export interface IPopupTriggers {
  openPopup: TriggerPhaseWrapper<{
    init: string | JSX.Element;
    open: null;
    close: null;
  }>;
}

export const popupInitialState: IPopupState = {
  content: '',
  isOpen: false,
};

const openPopupBite = createNeuron<
  IPopupTriggers,
  ITriggers,
  IPopupState,
  IState,
  'openPopup'
>(
  {
    init: (state, payload) => {
      state.content = payload;
    },
    open: (state, payload) => {
      state.isOpen = true;
    },
    close: (state, payload) => {
      state.isOpen = false;
    },
  },
  {
    canTrigger: ['openPopup'],
    updateOn: ['openPopup'],
    instance: 'stable',
    script: OpenPopupScript,
    initOn: 'init',
  }
);

export const popupSlice = createSlice<
  IPopupTriggers,
  ITriggers,
  IPopupState,
  IState
>(
  'popup',
  {
    openPopup: openPopupBite,
  },
  popupInitialState
);
