//import { ScriptUpdateArgsType } from '@seijs/redux-hang-on/lib/types';
import { IState, ITriggers } from 'src/_redux/types';
import {
  ScriptOptsType,
  ScriptInitArgsType,
} from '../../../../../dist/lib/types';
import { IRecordTriggers } from '../recorder.config';

export class PlayScript {
  constructor(
    private opts: ScriptOptsType<IRecordTriggers, ITriggers, IState, 'play'>
  ) {}
}
