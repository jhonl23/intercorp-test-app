import { Component, OnInit } from '@angular/core';
import { Root } from './models/root';
import { MsThreeServiceService } from './services/ms-three-service.service';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'intercorp-test-app';
  paginador:any;
  page: number = 0;
  pageEvent!: PageEvent;
  length = 0;
  pageSize = 0;
  pageIndex = 0;
  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  textSearch: string = '';
  

  roots: Root[] = [];
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'city', 'country', 'email', 'last_update', 'last_modified'];

  constructor(
    public _msThreeService: MsThreeServiceService,
    private activatedRoute:ActivatedRoute
  ){}

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {

      if(params.get('page') != null){
        this.page = +params.get('page')!;
      }

      this.getDataByParameters(this.textSearch, this.page);

    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log("FILTER VALUE: "+filterValue);
    this.textSearch = filterValue;
    this.getDataByParameters(filterValue, this.page);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageIndex = e.pageIndex;
    this.page = this.pageIndex;
    
    this.getDataByParameters(this.textSearch, this.pageIndex);
  }

  getData(page:number){
    this._msThreeService.getRoots(page).subscribe({
      next: (response:any) => {
        console.log(response);
        this.roots = response.content as Root[];
        this.paginador = response;

        this.length = this.paginador.totalElements;
        this.pageSize = this.paginador.size;
      },
      error: (error:any) =>{
        console.log(error);
      }
    });
  }

  getDataByParameters(textSearch: string, page: number){
    this._msThreeService.getRootsByParameters(page, textSearch).subscribe({
      next: (response:any) => {
        console.log(response);
        this.roots = response.content as Root[];
        this.paginador = response;

        this.length = this.paginador.totalElements;
        this.pageSize = this.paginador.size;
      },
      error: (error:any) =>{
        console.log(error);
      }
    });
  }


}
