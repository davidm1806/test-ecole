import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Expedition} from "../../_model/expedition";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AppSettingService} from "../../services/app-setting.service";
import {Colis} from "../../_model/colis";
import {MatDialog} from "@angular/material/dialog";
import {ColisAddComponent} from "../../shared/modal/colis-add/colis-add.component";
import {
  CLIENT_FIND_ALL__GET,
  COLIS_FIND_ARCHIVED_IS_FALSE__GET,
  COLIS_FIND_IS_ARCHIVED__PAGEABLE__GET
} from "../../_api_config/route-api";
import {Client} from "../../_model/client";
import {ClientAddComponent} from "../../shared/modal/client-add/client-add.component";
import {ColisViewDetailComponent} from "../../shared/modal/colis-view-detail/colis-view-detail.component";
import {ClientInfoComponent} from "../../shared/modal/client-info/client-info.component";

@Component({
  selector: 'app-trajets',
  templateUrl: './trajets.component.html',
  styleUrls: ['./trajets.component.scss']
})
export class TrajetsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dateDepart', 'dateArrive', 'nbreColis', 'adresseSource','adresseDestination','updateEtat', 'action'];
  dataSource: MatTableDataSource<Expedition> = new MatTableDataSource<Expedition>();


  displayedColumnsClient: string[] = ['id','name','surname','dateNais','telephone','dateCreation','dateLastUpdate','isUser','sexe','action'];
  dataSourceClient: MatTableDataSource<Client> = new MatTableDataSource<Client>();
  @ViewChild('paginatorClient', {static: true})  paginationClient: MatPaginator;


  sizeClient: number=25;
  pageClient: number=0;
  totalItemsClient: number;

  colisIsArchived = false;

  // pagination deuxième tableau

  /*------- pagination -------------------------------*/
  public totalItem: number;
  page = 0;
  private size: number;
  pageEvent: PageEvent;
  /*------------------ fin -----------------------------*/
  @ViewChild("expeditionPaginator", {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  expeditions: Expedition[] = [];
  periodeForm: FormGroup;


  /*----------- for second table ----------------------*/
  displayedColumnsColis: string[] = ['code', 'name', 'poids', 'nature','valeur','propretaire','destinataire','dateLastUpdate','montant','quantity','total', 'action'];
  dataSourceColis: MatTableDataSource<Colis> = new MatTableDataSource<Colis>();


  public totalItemColis: number;
  pageColis = 0;
  sizeColis = 25;
  pageEventColis: PageEvent;

  @ViewChild("colisPaginator", {static: true}) paginatorColis: MatPaginator;



  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private dialog: MatDialog,
              public appSettings: AppSettingService) { }

  ngOnInit(): void {
    this.periodeForm = this.formBuilder.group({
      from: [new Date(), Validators.required],
      till: ['', Validators.required]
    })

    this.findColis(this.colisIsArchived);
    this.clientFindAll();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  setPage(e: PageEvent): PageEvent {
    this.size = e.pageSize;
    this.page = e.pageIndex;


    return e;
  }

  applyFilterColis(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceColis.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceColis.paginator) {
      this.dataSourceColis.paginator.firstPage();
    }
  }

  applyFilterClient(event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceClient.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceClient.paginator) {
      this.dataSourceClient.paginator.firstPage();
    }
  }

  setPageColis(e: PageEvent): PageEvent {
    if (e.pageIndex != this.pageColis) {
      this.sizeColis = e.pageSize;
      this.pageColis = e.pageIndex;

      this.findColis(this.colisIsArchived);
    }

    return e;
  }

  setPageClient(e: PageEvent): PageEvent {
    if (e.pageIndex != this.pageClient) {
      this.sizeClient = e.pageSize;
      this.pageClient = e.pageIndex;

      this.clientFindAll();
    }

    return e;
  }

  findTrajetForPeriode() {

  }

  seeDetailColis(element: Colis) {
    const dialogRef =  this.dialog.open(ColisViewDetailComponent, {
      data: element,
      width: '1000px',
    })

    dialogRef.afterClosed().subscribe(data=>{
      element = data;
    })
  }



  editExpedition(element: any) {

  }

  seeDetail(element: any) {

  }

  findColis(value: boolean) {
    this.colisIsArchived = value;
    if(this.colisIsArchived)
      this.colisFindArchivedITrue()

    else
      this.colisFindArchivedIsFalese();
  }


  private colisFindArchivedITrue() {
    this.http.get<any>(`${COLIS_FIND_IS_ARCHIVED__PAGEABLE__GET}page=${this.pageColis}&size=${this.sizeColis}`).subscribe(data =>{
      this.totalItemColis = data.totalElements;
      this.dataSourceColis.data = data.content;
      this.dataSourceColis.paginator = this.paginatorColis;
      this.dataSourceColis.sort = this.sort;
    })
  }


  private colisFindArchivedIsFalese() {
    this.http.get<any>(`${COLIS_FIND_ARCHIVED_IS_FALSE__GET}page=${this.pageColis}&size=${this.sizeColis}`).subscribe(data =>{
      this.totalItemColis = data.totalElements;
      this.dataSourceColis.data = data.content;
      this.dataSourceColis.paginator = this.paginatorColis;
      this.dataSourceColis.sort = this.sort;
    })
  }

  clientFindAll() {
    this.http.get<any>(`${CLIENT_FIND_ALL__GET}page=${this.pageClient}&size=${this.sizeClient}`).subscribe(data =>{
      this.totalItemsClient = data.totalElements;
      this.dataSourceClient.data = data.content;
      this.dataSourceClient.paginator = this.paginatorColis;
      this.dataSourceClient.sort = this.sort;
    })
  }

  colisSave(colis: Colis) {
    if(!colis)
      colis = new Colis();

    if(colis.archiver)
      return;
    const dialogRef = this.dialog.open(ColisAddComponent, {
      width: '850px',
      data: colis,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data=>{
      if (data) {
        this.findColis(this.colisIsArchived);
      }
    })
  }


  clientSave(client: Client) {
    if(!client)
      client = new Client();

    const dialogRef = this.dialog.open(ClientAddComponent, {
      width: '600px',
      data: client,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(data=>{
      if (data) {
        this.clientFindAll();
      }
    })
  }


  clientDetail(client: Client) {
    this.dialog.open(ClientInfoComponent, {
      data: client,
      width: '1150px',
      minHeight: '500px',
      disableClose: false
    })
  }


}
