import { Client } from './client';
import { Place } from './place';
import { Status } from './status';
import { User } from './user';

export class Booking {

	id: number;
	arrival: string;
	departure: string;
	subtotal: number;
	total: number;
	discount: number;
	statuses: Array<Status>;
	status_ids: Array<number>;
	adults: number;
	childrens: number;
	pending: number;
	client_id: number;
	place_id: number;
	created_at: string;
	updated_at: string;
	client: Client;
	place: Place;
	user: User;
}
