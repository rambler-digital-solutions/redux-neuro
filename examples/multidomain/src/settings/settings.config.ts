import { createSlice } from '../../../../dist/lib';
import {
  effectiveBite,
  EffectiveState,
  EffectiveTrigger,
  effectiveInitialState,
} from 'src/_redux/effectiveBite';
import { IState, ITriggers } from 'src/_redux/types';
import { ISettings } from './interfaces/Settings.interface';
import { loadSetting } from 'src/_api/settings';

export interface ISettingsState {
  loadSettings: EffectiveState<null, ISettings, Error>;
}

export interface ISettingsTriggers {
  loadSettings: EffectiveTrigger<null, ISettings, Error>;
}

export const settingsInitialState: ISettingsState = {
  loadSettings: effectiveInitialState(),
};

const loadSettingsBite = effectiveBite<
  ISettingsTriggers,
  ITriggers,
  ISettingsState,
  IState,
  'loadSettings'
>(loadSetting, 'loadSettings');

export const settingsSlice = createSlice<
  ISettingsTriggers,
  ITriggers,
  ISettingsState,
  IState
>(
  'settings',
  {
    loadSettings: loadSettingsBite,
  },
  settingsInitialState
);
