import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryComponent } from './image-gallery.component';

describe('ImageGalleryComponent', () => {
  let component: ImageGalleryComponent;
  let fixture: ComponentFixture<ImageGalleryComponent>;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ ImageGalleryComponent ],
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openImageModal() should toggle #showModal to true', () => {
    const slideNo = 1; // mock data
    component.openImageModal(slideNo);
    expect(component.showModal).toBe(true, 'on after click');
  });

  it('#closeModal() should toggle #showModal to false', () => {
    component.closeModal();
    expect(component.showModal).toBe(false, 'off after click');
  });

  it('#currentSlide() should open clicked slide by using slideNo', () => {
    const slideNo = 4; // mock data
    component.currentSlide(slideNo);
    expect(component.clickedImageNo).toEqual(5);

  });

  it('#prevNextSlides() should show previous/next slide by using 1st slideNo', () => {
    // mock data - if 1st img opened(ie this.slideIndex === 0) and
    //  prev btn clicked(ie n == -1) then set clickedImageNo = this.allImagesLength
    const slideNo = 0;
    component.slideIndex = 0;
    component.prevNextSlides(slideNo);
    expect(component.clickedImageNo).toEqual(component.allImagesLength);
  });

  it('#prevNextSlides() should show previous/next slide by using last slideNo', () => {
    // mock data - if last img opened(ie this.slideIndex === this.allImagesLength + 1) and
    // next btn clicked(ie n ==- 1) then set clickedImageNo = 1
    const slideNo = 0;
    component.slideIndex = 9;
    component.allImagesLength = 8;
    component.prevNextSlides(slideNo);
    expect(component.clickedImageNo).toEqual(1);
  });

  it('#prevNextSlides() should show previous/next slide by using any slideNo', () => {
    // mock data - default case clicked image index
    const slideNo = 0;
    component.slideIndex = 5;
    component.prevNextSlides(slideNo);
    expect(component.clickedImageNo).toEqual(5);
  });
});
