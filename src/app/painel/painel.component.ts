import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Frase } from "../shared/frase.model";
import { FRASES } from "./frases-mock";

@Component({
  selector: "app-painel",
  templateUrl: "./painel.component.html",
  styleUrls: ["./painel.component.css"]
})
export class PainelComponent implements OnInit {
  public frases: Frase[] = FRASES;
  public instrucao: string = "Traduza a frase";
  public resposta: string = "";
  public rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;
  public tentativas: number = 3;
  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit(): void {}

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    if (this.rodadaFrase.frasePtBr != this.resposta) {
      this.tentativas--;
      if (this.tentativas === -1) this.encerrarJogo.emit("Derrota");
      return;
    }

    //fim de jogo
    if (this.rodada === 4) {
      this.encerrarJogo.emit("Vitória");
      return;
    }

    //trocar a resposta
    this.rodada++;
    this.atualizaRodada();

    //aumenta a barra de progresso
    this.progresso += 100 / this.frases.length;
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];

    //limpar a resposta do usuário
    this.resposta = "";
  }
}
