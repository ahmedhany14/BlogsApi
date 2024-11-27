import 'reflect-metadata';
import { IMethods } from './types/IMethods';
import { IMetedata } from './types/IMetedata';

function routeBinder(method: string) {
	return function (path: string) {
		return function (target: any, key: string) {
			Reflect.defineMetadata(IMetedata.path, path, target, key);
			Reflect.defineMetadata(IMetedata.method, method, target, key);
		}
	}
}

export const Get = routeBinder(IMethods.get);
export const Post = routeBinder(IMethods.post);
export const Put = routeBinder(IMethods.put);
export const Delete = routeBinder(IMethods.delete);
export const Patch = routeBinder(IMethods.patch);