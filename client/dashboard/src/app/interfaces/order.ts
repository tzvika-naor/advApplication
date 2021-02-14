import { SmartphoneId } from './smartphoneId';
export interface Order {
    user: string;
    smartphones: SmartphoneId[];
    date?: string;
    status?: string;
}