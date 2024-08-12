import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CursoInterface } from '../shared/interfaces/curso.interface';
import { DisciplinaInterface } from '../shared/interfaces/disciplina.interface';
import { CursosService } from '../shared/services/cursos.service';
import { DisciplinasService } from '../shared/services/disciplinas.service';
import { LoginService } from '../shared/services/login.service';
import { UsuarioInterface } from '../shared/interfaces/usuario.interface';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.scss'],
})
export class DisciplinasComponent implements OnInit {
  disciplinasSemestre: { [key: string]: Array<DisciplinaInterface> } = {};
  curso!: CursoInterface;
  usuarioLogado: UsuarioInterface | null = null;

  constructor(
    private loginService: LoginService,
    private disciplinasService: DisciplinasService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.usuarioLogado = this.loginService.recuperarUsuarioLogado();
    if (this.usuarioLogado) {
      this.cursosService
        .getCurso(this.usuarioLogado.curso)
        .subscribe((curso) => {
          this.curso = curso;
          this.loadDisciplinas();
        });
    }
  }

  loadDisciplinas(): void {
    this.disciplinasService
      .getDisciplinasCurso(this.curso.id)
      .subscribe((disciplinas) => {
        disciplinas.forEach((disciplina) => {
          const semestre = disciplina.semestre;
          if (!this.disciplinasSemestre[semestre]) {
            this.disciplinasSemestre[semestre] = [];
          }
          this.disciplinasSemestre[semestre].push(disciplina);
        });
      });
  }

  getSemestres(): Array<string> {
    return Object.keys(this.disciplinasSemestre);
  }
}
