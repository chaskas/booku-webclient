import { Client } from './client';
import { Place } from './place';

export class Booking {

	id: number;
	arrival: string;
	departure: string;
	subtotal: number;
	total: number;
	discount: number;
	status: number;
	adults: number;
	childrens: number;
	client_id: number;
	place_id: number;
	created_at: string;
	updated_at: string;
	client: Client;
	place: Place;

}
