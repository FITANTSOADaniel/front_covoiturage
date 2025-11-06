import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    status : any;
    constructor() { }

    setStatus(status: any) {
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    getCurrentTime(): string {
        const now = new Date();
        return now.toLocaleTimeString();
    }
}
