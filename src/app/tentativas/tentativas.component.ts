import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { Coracao } from "../shared/coracao.model";

@Component({
  selector: "app-tentativas",
  templateUrl: "./tentativas.component.html",
  styleUrls: ["./tentativas.component.css"]
})
export class TentativasComponent implements OnInit, OnChanges {
  @Input() public tentativas: number;

  public coracoes: Coracao[] = [
    new Coracao(true),
    new Coracao(true),
    new Coracao(true)
  ];

  constructor() {}

  //método usado no input dos dados
  ngOnChanges() {
    if (this.tentativas !== this.coracoes.length) {
      let index = this.coracoes.length - this.tentativas;
      this.coracoes[index - 1].cheio = false;
    }
  }

  ngOnInit() {}
}
