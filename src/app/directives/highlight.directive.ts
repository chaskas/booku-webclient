import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('appHighlight') highlightTitle: string;

  wrapper = this.renderer.createElement('div');

  text = this.renderer.createText('');

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.text = this.renderer.createText(this.highlightTitle);
  }

  @HostListener('mouseenter') onMouseEnter() {

    this.text = this.renderer.createText(this.highlightTitle);

    this.highlight(this.highlightTitle || '');

  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(title: string) {

    if(title)
    {
      this.highlightTitle = title;
      this.renderer.appendChild(this.wrapper, this.text);
      this.renderer.appendChild(this.el.nativeElement, this.wrapper);
    } else {
      this.renderer.removeChild(this.el.nativeElement, this.wrapper);
      this.renderer.removeChild(this.wrapper, this.text);
    }

  }

}
