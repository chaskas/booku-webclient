import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';

import { Moment } from 'moment';
import * as moment from 'moment';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input('name') name: string;
  @Input('date') date: string;

  wrapper = this.renderer.createElement('div');

  name_div = this.renderer.createElement('div');
  date_div = this.renderer.createElement('div');

  name_text = this.renderer.createText('');
  date_text = this.renderer.createText('');

  constructor(private el: ElementRef, private renderer: Renderer2) {

    moment.locale('es');


    this.name_text = this.renderer.createText(this.name);
    this.date_text = this.renderer.createText(moment(this.date).format('dddd, DD/MM/YYYY'));

    this.renderer.setAttribute(this.wrapper, 'fxLayout', 'column');
    this.renderer.setAttribute(this.wrapper, 'fxLayoutAlign', 'space-around center');

    this.renderer.setStyle(this.name_div, 'text-align', 'center');

  }

  @HostListener('mouseenter') onMouseEnter() {

    this.name_text = this.renderer.createText(this.name);
    this.date_text = this.renderer.createText(moment(this.date).format('dddd, DD/MM/YYYY'));

    this.highlight(this.name || '', this.date || '');

  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeChild(this.wrapper, this.name);
    this.renderer.removeChild(this.wrapper, this.date);
    this.renderer.removeChild(this.el.nativeElement, this.wrapper);
    this.highlight(null, null);
  }

  private highlight(name: string | null, date: string | null) {

    if(name != null && date != null)
    {
      this.name = name;
      this.date = date;
      this.renderer.appendChild(this.name_div, this.name_text);
      this.renderer.appendChild(this.date_div, this.date_text);
      this.renderer.appendChild(this.wrapper, this.name_div);
      this.renderer.appendChild(this.wrapper, this.date_div);
      this.renderer.appendChild(this.el.nativeElement, this.wrapper);
    } else {
      this.renderer.removeChild(this.name_div, this.name_text);
      this.renderer.removeChild(this.date_div, this.date_text);
      this.renderer.removeChild(this.wrapper, this.name_div);
      this.renderer.removeChild(this.wrapper, this.date_div);
      this.renderer.removeChild(this.el.nativeElement, this.wrapper);
    }

  }

}
