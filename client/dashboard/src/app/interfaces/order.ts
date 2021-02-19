import { SmartphonesId } from './smartphonesId';
export interface Order {
    user: string;
    smartphones: SmartphonesId[];
    totalPrice: Number;
    date?: string;
    status?: string;
}