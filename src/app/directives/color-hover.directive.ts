import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorHover]'
})
export class ColorHoverDirective {

  icon_wp = this.renderer.createElement('mat-icon');
  icon = this.renderer.createText('check_circle');

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.icon_wp, 'mat-icon');
    this.renderer.addClass(this.icon_wp, 'material-icons');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.appendChild(this.icon_wp, this.icon);
    this.renderer.appendChild(this.el.nativeElement, this.icon_wp);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeChild(this.icon_wp, this.icon);
    this.renderer.removeChild(this.el.nativeElement, this.icon_wp);
  }

}
