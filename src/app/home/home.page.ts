import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: any;

  constructor() { }

  ngOnInit() {
    this.checkToken();
    this.getAllPemilihan();
  }

  async getAllPemilihan() {
    const res = await fetch('http://localhost:8000/api/pemilihan', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });

    const json = await res.json();
    this.items = json.data;
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  checkToken() {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    }
  }
}
