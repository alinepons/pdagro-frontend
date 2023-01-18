import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-result',
  templateUrl: './modal-result.component.html',
  styleUrls: ['./modal-result.component.scss']
})
export class ModalResultComponent implements OnInit {

  @Input() data: any

  results: any
  resultProcess: any[] = []
  resultLaw: any[] = []
  resultTech: any[] = []
  resultLearning: any[] = []

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.results = this.data.diagnostic.reply

   Object.keys(this.results.proccess).forEach(k => {
    this.resultProcess.push(this.results.proccess[k])
   })
   Object.keys(this.results.law).forEach(k => {
    this.resultLaw.push(this.results.law[k])
   })
   Object.keys(this.results.tech).forEach(k => {
    this.resultTech.push(this.results.tech[k])
   })
   Object.keys(this.results.learning).forEach(k => {
    this.resultLearning.push(this.results.learning[k])
   })
  }

  buildResults() {

  }

  closeModal() {
    this.activeModal.dismiss()
  }

}
