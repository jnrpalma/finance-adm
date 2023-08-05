import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalstorageService } from './../../../services/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

import { Router } from '@angular/router';
import { DownloadImage } from 'src/app/interfaces/downloadImage';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  messageHour!: string;
  showNameUser!: string;
  isDefaultImage = '../../../../assets/images/default.png'
  imageUserUrl!: string;
  isHideLoading = true;

  constructor(private localStorageService: LocalstorageService, 
    private apiService: ApiService, private sanitizer: DomSanitizer,
    private router: Router
    
    ) {}
  
  ngOnInit(): void {
    this.getNameUser();
    this.getImageUser();
  }

  getImageUser(){
    const nameImage = this.localStorageService.getLocalStorage('userInfo');
    this.apiService.downloadImage(nameImage.image).subscribe((res: DownloadImage) => {
      this.imageUserUrl = 'data:image/jpg;base64,' + res.image;
    })
  }

  getMessageHour(message: string) {
    this.messageHour = message;
  }

  getNameUser() { 
    const nameUser = this.localStorageService.getLocalStorage('userInfo');
    this.showNameUser = nameUser.name;
  }

  logout() {
    this.isHideLoading = false; // Exibe o componente de loading
    this.localStorageService.removeLocalStorage('token');
    // Simulação de um tempo de espera antes de redirecionar
    setTimeout(() => {
      this.isHideLoading = true; // Oculta o componente de loading
      this.router.navigate(['/']);
    }, 2000); // Tempo de espera de 2 segundos antes do redirecionamento
  }

}
