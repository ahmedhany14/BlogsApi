import 'reflect-metadata'

import { IMetedata } from './types/IMetedata';

export function validator(...keys: string[]) {
	return function (target: any, key: string) {
		Reflect.defineMetadata(IMetedata.validator, keys, target, key);
	}
}