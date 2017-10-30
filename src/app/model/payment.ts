import { Booking } from './booking';

export class Payment {

	id: number;
	amount: number;
	method: number;
	bill: number;
	booking_id: number;
	booking: Booking;
	pending: number;
	created_at: string;
	updated_at: string;

}
