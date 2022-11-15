import * as React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import store, { dispatch } from 'src/_redux';
import { IState } from 'src/_redux/types';
import { useTrigger } from 'src/_redux/useTrigger';
import { Graph } from './Graph';
import './style.less';

export const Recorder = () => {
  const recorderState = useSelector((state: IState) => state.recorder);
  const trigger = useTrigger();

  React.useEffect(() => {
    trigger('record', 'init', null);
    trigger('openPopup', 'init', <Graph />);
  }, []);

  return (
    <div className='recorder'>
      <div>{recorderState.time}</div>
      <button onClick={() => trigger('record', 'act', null)}>Начать</button>
      {recorderState.isRecording ? <div>Идет запись</div> : null}
      {!recorderState.isRecording ? (
        <button onClick={() => trigger('openPopup', 'open', null)}>
          Показать граф
        </button>
      ) : null}
    </div>
  );
};
