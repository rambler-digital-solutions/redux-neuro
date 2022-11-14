import { ScriptUpdateArgsType } from '../../../../../dist/lib/types';
import { IState, ITriggers } from 'src/_redux/types';
import {
  ScriptOptsType,
  ScriptInitArgsType,
} from '../../../../../dist/lib/types';
import { Record } from '../interfaces/Record.interface';
import { IRecordTriggers } from '../recorder.config';

export class RecordScript {
  constructor(
    private opts: ScriptOptsType<IRecordTriggers, ITriggers, IState, 'record'>
  ) {}

  private time: number = 0;
  private records: Array<Record>;
  private isStart: boolean = false;
  private interval;

  public init(args: ScriptInitArgsType<IRecordTriggers, 'record', 'init'>) {
    this.records = [];
  }
  private act(args: ScriptUpdateArgsType<IRecordTriggers, 'record', 'act'>) {
    if (this.isStart) {
      this.opts.trigger('record', 'stop', null);
    } else {
      this.opts.trigger('record', 'start', null);
    }
  }

  public update(
    args: ScriptUpdateArgsType<
      IRecordTriggers,
      'record',
      'start' | 'stop' | 'act'
    >
  ) {
    // if (args.targetMethod === 'act' && args.targetName === 'record') {
    //   this.act(args as any);
    // }
    // if (args.targetMethod === 'start' && args.targetName === 'record') {
    //   this.handleStart(args as any);
    // }
    // if (args.targetMethod === 'stop' && args.targetName === 'record') {
    //   this.handleStop(args as any);
    // }
    // else if (this.isStart && args.targetName !== 'setState') {
    //   this.records.push({
    //     args: args.payload,
    //     status: args.targetMethod,
    //     trigger: args.targetName as any,
    //     time: this.time,
    //   });
    //   console.log(this.records);
    // }

    console.log(`${args.targetName}/${args.methodName}`);
  }

  private handleStart(
    args: ScriptUpdateArgsType<IRecordTriggers, 'record', 'start'>
  ) {
    this.isStart = true;
    this.opts.trigger('setState', '', {
      isRecording: true,
    });
    this.interval = setInterval(() => {
      this.time += 1;
      this.opts.trigger('setState', '', {
        time: this.time,
      });
    }, 1000);
  }
  private handleStop(
    args: ScriptUpdateArgsType<IRecordTriggers, 'record', 'stop'>
  ) {
    this.isStart = false;
    this.opts.trigger('setState', '', {
      isRecording: false,
    });
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
