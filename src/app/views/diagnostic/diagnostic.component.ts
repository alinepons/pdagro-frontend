import { Component, OnInit } from '@angular/core';
import { ReplyService } from 'src/app/core/service/reply.service';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {

  constructor(private replySrv: ReplyService) { }

  async ngOnInit(): Promise<void> {
   const questions = await this.replySrv.getQuestions()
   console.log(questions)
  }

}
