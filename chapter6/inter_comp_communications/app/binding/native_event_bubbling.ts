import {bootstrap} from 'angular2/platform/browser';
import {Component, ElementRef, Directive} from 'angular2/core';

interface IPriceQuote {
  stockSymbol: string,
  lastPrice: number
}

@Component({
  selector: 'price-quoter',
  template: `PriceQuoter: {{stockSymbol}} \${{price}}`,
  styles:[`:host {background: pink;}`]
})
class PriceQuoterComponent {
  stockSymbol: string = "IBM";
  price:number;

  constructor(element: ElementRef) {
    setInterval(() => {

      let priceQuote: IPriceQuote = {
        stockSymbol: this.stockSymbol,
        lastPrice: (100*Math.random()).toFixed(2)
      };

      this.price = priceQuote.lastPrice;

      element.nativeElement
          .dispatchEvent(new CustomEvent('last-price', {
            detail: priceQuote,
            bubbles: true
          }));
    }, 1000);
  }
}

@Component({
  selector: 'app',
  template: `
    <div (last-price)="priceQuoteHandler($event)">
      <price-quoter></price-quoter>
    </div>
    <br>
    AppComponent received: {{stockSymbol}} \${{price}}
  `,
  directives: [PriceQuoterComponent]
})
class AppComponent {

  stockSymbol: string;
  price:number;

  priceQuoteHandler(event: CustomEvent) {
    this.stockSymbol = event.detail.stockSymbol;
    this.price = event.detail.lastPrice;
  }
}
bootstrap(AppComponent);
