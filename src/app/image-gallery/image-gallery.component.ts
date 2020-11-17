import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit {
  allImages: any = [
    { id: 1, title: 'ABC', url: 'assets/images/img1.jpg' },
    { id: 2, title: 'DEF', url: 'assets/images/img2.jpg' },
    { id: 3, title: 'GHI', url: 'assets/images/img3.jpg' },
    { id: 4, title: 'JKL', url: 'assets/images/img4.jpg' },
    { id: 5, title: 'LMN', url: 'assets/images/img5.jpg' },
    { id: 6, title: 'NOP', url: 'assets/images/img6.jpg' },
    { id: 7, title: 'PQR', url: 'assets/images/img7.jpg' },
    { id: 8, title: 'XYZ', url: 'assets/images/img8.jpg' }
];
  allImagesLength: number;
  slideIndex: any = 0;
  showModal = false;
  clickedImageNo: number;

  constructor() {}

   ngOnInit(): void {
    this.allImagesLength = this.allImages.length;
    this.showModal = false;
  }

  currentSlide(n: any): void {
    this.slideIndex = n + 1;
    this.clickedImageNo = this.slideIndex;
    this.showSlides(this.slideIndex);
  }

  openImageModal(slideNo: any): void{
     this.showModal = true;
     this.slideIndex = slideNo + 1;
     this.clickedImageNo = this.slideIndex;
     this.showSlides(this.slideIndex);
  }

  closeModal(): void {
   this.showModal = false;
  }

  prevNextSlides(n: any): void {
      this.slideIndex += n;
      if ( this.slideIndex === 0){
      // if 1st img opened(ie this.slideIndex === 0) and
      // prev btn clicked(ie n == -1) then set clickedImageNo = this.allImagesLength
            this.clickedImageNo = this.allImagesLength;
      }else if ( this.slideIndex === this.allImagesLength + 1){
      // if last img opened(ie this.slideIndex === this.allImagesLength + 1) and
      // next btn clicked(ie n ==- 1) then set clickedImageNo = 1
            this.clickedImageNo = 1;
      }else{
      // default case clicked image index
            this.clickedImageNo = this.slideIndex;
      }
      this.showSlides(this.slideIndex);
   }


  showSlides(n: any): void {
    setTimeout(() => {
        let i;
        const slides = document.getElementsByClassName('mySlides')as HTMLCollectionOf < HTMLElement > ;
        const dots = document.getElementsByClassName('demo') as HTMLCollectionOf < HTMLElement >;
        const captionText = document.getElementById('caption');
        if (n > slides.length) {this.slideIndex = 1; }
        if (n < 1) {this.slideIndex = slides.length; }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(' active', '');
        }
        slides[this.slideIndex - 1].style.display = 'block';
        dots[this.slideIndex - 1].className += ' active';
        //captionText.innerHTML = dots[this.slideIndex - 1].alt;
    }, 100);
  }

 }
