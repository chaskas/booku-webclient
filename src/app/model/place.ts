import { PType } from './ptype';

export class Place {

	id: number;
	ptype_id: number;
	name: string;
	capacity: number;
	price: number;
	opening: string;
	closing: string;
	created_at: string;
	updated_at: string;
	ptype: PType;
}