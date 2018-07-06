// @flow

type Initial = { dataState: 'initial' };
type Loading = { dataState: 'loading' };
type Failed = { dataState: 'failed' };
type Loaded<Data> = { dataState: 'loaded', data: Data };

export type LoadableData<Data> = Initial | Loading | Failed | Loaded<Data>;
