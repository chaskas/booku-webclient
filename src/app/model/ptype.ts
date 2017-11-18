import { Place } from './place';

export class PType {

	id: number;
	name: string;
	plural: string;
	schedule_type: number;
	opening: string;
	closing: string;
	places: Place[];
}
