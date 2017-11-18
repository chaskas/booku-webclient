import { PType } from './ptype';

export class Place {

	id: number;
	ptype_id: number;
	name: string;
	capacity: number;
	price: number;
	created_at: string;
	updated_at: string;
	ptype: PType;
	extra_night: number;
	extra_passenger: number;
	dsep: number;
}
