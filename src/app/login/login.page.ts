import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: any = {};
  constructor(
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkToken();
  }

  async login() {
    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nis: this.form.email,
        password: this.form.password
      })
    });

    const json = await res.json();
    if (res.status !== 200) {
      alert(json.message);
      return;
    }

    const token = json.data.token;

    localStorage.setItem('token', token);

    const toast = await this.toastController.create({
      message: 'Login berhasil',
      duration: 2000
    });

    toast.present();

    this.router.navigateByUrl('/home');
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('/home');
    }
  }
}
