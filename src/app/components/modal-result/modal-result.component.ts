import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-result',
  templateUrl: './modal-result.component.html',
  styleUrls: ['./modal-result.component.scss']
})
export class ModalResultComponent implements OnInit {

  @Input() data: any

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.buildFinalResults()
    this.buildPartialResults()
  }

  buildFinalResults() {
    console.log(this.data)

    console.log(this.data.diagnostic.proccess)
    console.log(this.data.diagnostic.law)
    console.log(this.data.diagnostic.tech)
    console.log(this.data.diagnostic.learning)

    // Média ponderada
    //T1 = soma amount
    //PD1 = peso da dimensao 
    // T1 x PD1
    // soma entre eles depois divide pela soma dos PD1... PD4


    // Fator de correcao
    //F1 = quantidade de questoes de cada dimensao
    //PD1 = peso da dimensao 
    // T1 x PD1
    // soma entre eles depois divide pela soma dos PD1... PD4

    // Media ponderada - Fator de correcao

    // let T1 = 0
    // let F1 = this.resultProcess.length
    // let PD1 = this.data.pesos.proccess

    // let T2 = 0
    // let F2 = this.resultLaw.length
    // let PD2 = this.data.pesos.law

    // let T3 = 0
    // let F3 = this.resultTech.length
    // let PD3 = this.data.pesos.tech

    // let T4 = 0
    // let F4 = this.resultLearning.length
    // let PD4 = this.data.pesos.learning

    // let somaPesos = 0
    // somaPesos = this.data.pesos.proccess + this.data.pesos.law + this.data.pesos.tech + this.data.pesos.learning

    // this.resultProcess.forEach(x => T1 += x.amount)
    // this.resultLaw.forEach(x => T2 += x.amount)
    // this.resultTech.forEach(x => T3 += x.amount)
    // this.resultLearning.forEach(x => T4 += x.amount)



    // let media = ((T1 * PD1) + (T2 * PD2) + (T3 * PD3) + (T4 * PD4)) / (PD1 + PD2 + PD3 + PD4)
    // let fator = ((F1 * PD1) + (F2 * PD2) + (F3 * PD3) + (F4 * PD4)) / (PD1 + PD2 + PD3 + PD4)



    // console.log(Math.ceil(media - fator))
  }

  buildPartialResults() {
    console.log(this.data)

    // console.log(this.resultProcess)
    // console.log(this.resultLaw)
    // console.log(this.resultTech)
    // console.log(this.resultLearning)

    //Dx = Média ponderada da dimensao
    //Qx = Resposta de cada questao
    //PQx = Peso da questao

    // let D1 = 0
    // let sum = 0
    // let sumPQ = 0

    // for (let i = 0; i < this.resultProcess.length; i++) {
    //   sumPQ += this.resultProcess[i].weight
    //   sum += (this.resultProcess[i].amount * this.resultProcess[i].weight)
    // }
    // D1 = sum / sumPQ
    // console.log(Math.ceil(D1))

    // this.resultLaw.forEach(x => T2 += x.amount)
    // this.resultTech.forEach(x => T3 += x.amount)
    // this.resultLearning.forEach(x => T4 += x.amount)

    // let media = ((T1 * PD1) + (T2 * PD2) + (T3 * PD3) + (T4 * PD4)) / (PD1 + PD2 + PD3 + PD4)
    // let fator = ((F1 * PD1) + (F2 * PD2) + (F3 * PD3) + (F4 * PD4)) / (PD1 + PD2 + PD3 + PD4)



    // console.log(Math.ceil(media - fator))
  }

  closeModal() {
    this.activeModal.dismiss()
  }

}
