import { SmartphoneId } from './smartphoneId';
export interface Order {
    user: string;
    smartphones: SmartphoneId[];
    date?: Date;
    status?: string;
}