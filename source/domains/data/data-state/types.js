// @flow
export type DataState = 'idle' | 'loading' | 'loaded' | 'failed';

type Idle = { dataState: 'idle' };
type Loading = { dataState: 'loading' };
type Failed = { dataState: 'failed' };
type Loaded<Data> = { dataState: 'loaded', data: Data };

export type LoadableData<Data> = Idle | Loading | Failed | Loaded<Data>;
