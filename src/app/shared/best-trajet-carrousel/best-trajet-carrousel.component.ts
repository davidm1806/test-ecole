import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SwiperConfigInterface} from "ngx-swiper-wrapper";

@Component({
  selector: 'app-best-trajet-carrousel',
  templateUrl: './best-trajet-carrousel.component.html',
  styleUrls: ['./best-trajet-carrousel.component.scss']
})
export class BestTrajetCarrouselComponent implements OnInit, AfterViewInit {

  expeditionLasts = [
    {duree: '1 jour', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '5 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '7 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '1 Heure', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '10 Heure', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '5 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 Heures', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 Heures', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 Heures', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 Jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 Jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 Jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 Jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 Jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' },
    {duree: '3 jours', from: 'Cameroun', till:'Tchad', poids: '18' }
  ];
  config: SwiperConfigInterface={};
  constructor() { }

  ngOnInit(): void {
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        3000: {
          slidesPerView: 4,
        }

      }
    }
  }

  ngAfterViewInit(): void {
    this.config = {
      observer: true,
      slidesPerView: 4,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        3000: {
          slidesPerView: 4,
        }

      }
    }
  }

}
