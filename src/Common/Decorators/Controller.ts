import 'reflect-metadata';

import  router from "../../app";

import { IMethods } from "./types/IMethods";
import { IMetedata } from "./types/IMetedata";

import BodyCheck from "../middleware/BodyCheck";

export function Controller(routePrefix: string) {
	return function (target: Function) {
		const routeHandlers = Object.getOwnPropertyNames(target.prototype)

		for (let key of routeHandlers) {
			const functionHandler = target.prototype[key];

			const path = Reflect.getMetadata(IMetedata.path, target.prototype, key);
			const method: IMethods = Reflect.getMetadata(IMetedata.method, target.prototype, key);
			const middlewares = Reflect.getMetadata(IMetedata.middleware, target.prototype, key) || [];
			const validatorBody = Reflect.getMetadata(IMetedata.validator, target.prototype, key) || [];

			if (path) {
				router[method](
					`${routePrefix}${path}`,
					...middlewares,
					BodyCheck(...validatorBody),
					functionHandler
				);
			}
		}
	}
}